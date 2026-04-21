import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Board } from './components/Board';
import { REPERTOIRE, RepertoireLine, MoveAnnotation } from './data/repertoire';
import { cn } from './utils';
import { auth, loginWithGoogle, logout, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

type ViewMode = 'landing' | 'study' | 'train';

export default function App() {
  const [game, setGame] = useState(new Chess());
  const [mode, setMode] = useState<ViewMode>('landing');
  const [user, setUser] = useState<User | null>(null);
  
  // Study Mode State
  const [lineIdx, setLineIdx] = useState<number>(0);
  const [moveIdx, setMoveIdx] = useState<number>(0);

  // Train Mode State
  const [trainLine, setTrainLine] = useState<RepertoireLine | null>(null);
  const [trainHadError, setTrainHadError] = useState(false);
  const [trainStatus, setTrainStatus] = useState<{type: 'info'|'ready'|'success'|'error', msg: string}>({type: 'info', msg: 'Cliquez sur "Nouvelle ligne" pour commencer'});
  const [trainStats, setTrainStats] = useState({ good: 0, bad: 0, streak: 0 });
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [hintSquare, setHintSquare] = useState<string | null>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user stats
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTrainStats(s => ({ ...s, good: data.good || 0, bad: data.bad || 0 }));
        } else {
          // Initialize in DB
          try {
            await setDoc(docRef, { good: 0, bad: 0, updatedAt: serverTimestamp() });
          } catch (e) {
            console.error("Could not initialize user stats", e);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync stats when they change and user is logged in
  const persistStats = useCallback(async (good: number, bad: number) => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { good, bad, updatedAt: serverTimestamp() });
      } catch (e) {
        console.error("Could not persist stats", e);
      }
    }
  }, [user]);

  // Derive active line based on mode
  const activeLine = mode === 'study' ? REPERTOIRE[lineIdx] : trainLine;
  const activeMoveIndex = mode === 'study' ? moveIdx : moveIdx; 

  const updateGameState = useCallback(() => {
    const newGame = new Chess();
    if (activeLine && activeMoveIndex > 0) {
      for (let i = 0; i < activeMoveIndex; i++) {
        if (activeLine.moves[i]) {
          newGame.move(activeLine.moves[i].san);
        }
      }
    }
    setGame(newGame);
  }, [activeLine, activeMoveIndex]);

  useEffect(() => {
    updateGameState();
  }, [updateGameState]);

  // Handle keyboard navigation for study mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'study' || !activeLine) return;
      if (e.key === 'ArrowRight' && moveIdx < activeLine.moves.length) {
        setMoveIdx(m => m + 1);
      } else if (e.key === 'ArrowLeft' && moveIdx > 0) {
        setMoveIdx(m => m - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, activeLine, moveIdx]);

  // Get current move data
  let lastMove = null;
  if (activeMoveIndex > 0) {
    const hist = game.history({ verbose: true });
    if (hist.length > 0) {
      const hm = hist[hist.length - 1];
      lastMove = { from: hm.from, to: hm.to };
    }
  }

  const currentAnnotation = activeMoveIndex > 0 && activeLine ? activeLine.moves[activeMoveIndex - 1] : undefined;

  // --- STUDY MODE ACTIONS ---
  const handleSelectLine = (index: number) => {
    setLineIdx(index);
    setMoveIdx(0);
  };

  // --- TRAIN MODE ACTIONS ---
  const startTraining = () => {
    const randomIdx = Math.floor(Math.random() * REPERTOIRE.length);
    setTrainLine(REPERTOIRE[randomIdx]);
    setMoveIdx(0);
    setTrainHadError(false);
    setSelectedSquare(null);
    setHintSquare(null);
    setTrainStatus({type: 'ready', msg: `« ${REPERTOIRE[randomIdx].name} » — à vous, jouez le premier coup des Blancs.`});
  };

  const showHint = () => {
    if (!trainLine || moveIdx >= trainLine.moves.length) return;
    const expectedMove = trainLine.moves[moveIdx];
    const tempGame = new Chess(game.fen());
    const m = tempGame.move(expectedMove.san);
    if (m) {
      setHintSquare(m.from);
      setTrainStatus({type: 'ready', msg: `💡 Indice : pièce sur ${m.from.toUpperCase()}`});
      setTrainStats(s => ({...s, streak: 0}));
      setTrainHadError(true);
    }
  };

  const showAnswer = () => {
    if (!trainLine || moveIdx >= trainLine.moves.length) return;
    const expected = trainLine.moves[moveIdx];
    const newGame = new Chess(game.fen());
    newGame.move(expected.san);
    setGame(newGame);
    setMoveIdx(m => m + 1);
    setHintSquare(null);
    setSelectedSquare(null);
    setTrainHadError(true);
    setTrainStats(s => ({...s, streak: 0}));
    setTrainStatus({type: 'error', msg: `Réponse : ${expected.san}. Mémorisez bien !`});
    
    // Set timeout to let black respond if needed
    setTimeout(() => {
      if (moveIdx + 1 >= trainLine.moves.length) {
         setTrainStatus({type: 'error', msg: 'Ligne incomplète.'});
         setTrainStats(s => ({...s, bad: s.bad + 1}));
      } else {
         playBlackResponse(moveIdx + 1, trainLine, newGame);
      }
    }, 1400);
  };

  const playBlackResponse = (currentIdx: number, line: RepertoireLine, currentGame: Chess) => {
    if (currentIdx >= line.moves.length) return;
    
    const blackMove = line.moves[currentIdx];
    const nextGame = new Chess(currentGame.fen());
    nextGame.move(blackMove.san);
    setGame(nextGame);
    setMoveIdx(currentIdx + 1);
    
    if (currentIdx + 1 >= line.moves.length) {
       finishTraining(true);
    } else {
       setTrainStatus({type: 'ready', msg: 'À vous ! Jouez le coup des Blancs.'});
    }
  };

  const finishTraining = (success: boolean) => {
    if (success && !trainHadError) {
      setTrainStats(s => ({...s, good: s.good + 1, streak: s.streak + 1}));
      setTrainStatus({type: 'success', msg: '🏆 Ligne complétée sans erreur ! Nouvelle ligne ?'});
    } else if (success) {
      setTrainStats(s => ({...s, good: s.good + 1}));
      setTrainStatus({type: 'success', msg: '✓ Ligne complétée. Nouvelle ligne ?'});
    } else {
      setTrainStats(s => ({...s, bad: s.bad + 1, streak: 0}));
      setTrainStatus({type: 'error', msg: 'Ligne incomplète.'});
    }
  };

  useEffect(() => {
    // When trainStats change, persist if user is logged in
    // To avoid loop, persistStats checks user inside
    if (user) {
      persistStats(trainStats.good, trainStats.bad);
    }
  }, [trainStats.good, trainStats.bad, user, persistStats]);

  const handleSquareClick = (sq: string) => {
    if (mode !== 'train' || !trainLine || moveIdx >= trainLine.moves.length) return;
    
    const expected = trainLine.moves[moveIdx];
    
    if (selectedSquare) {
      if (selectedSquare === sq) {
        setSelectedSquare(null);
        return;
      }
      
      const tempGame = new Chess(game.fen());
      try {
        const moveAttempt = tempGame.move({from: selectedSquare, to: sq, promotion: 'q'});
        if (moveAttempt) {
           if (moveAttempt.san === expected.san) {
             // Correct move
             setGame(tempGame);
             setMoveIdx(m => m + 1);
             setSelectedSquare(null);
             setHintSquare(null);
             setTrainStatus({type: 'success', msg: `✓ ${expected.san} — bien joué !`});
             
             if (moveIdx + 1 >= trainLine.moves.length) {
               finishTraining(true);
             } else {
               setTimeout(() => {
                 playBlackResponse(moveIdx + 1, trainLine, tempGame);
               }, 700);
             }
           } else {
             // Wrong move
             setTrainHadError(true);
             setTrainStats(s => ({...s, streak: 0}));
             setTrainStatus({type: 'error', msg: `✗ ${moveAttempt.san} n'est pas le coup attendu. Réessayez.`});
             setSelectedSquare(null);
           }
        } else {
          // Invalid move selection, just clear or re-select
          const piece = game.get(sq as any);
          if (piece && piece.color === game.turn()) {
            setSelectedSquare(sq);
          } else {
            setSelectedSquare(null);
          }
        }
      } catch (e) {
        setSelectedSquare(null);
      }
    } else {
      const piece = game.get(sq as any);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(sq);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-[#FCE300] selection:text-black bg-[#fdfaf6]">
      {/* HEADER */}
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white border-b-[3px] border-black z-20 sticky top-0">
        <button onClick={() => setMode('landing')} className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FCE300] border-[3px] border-black rounded-full flex items-center justify-center font-heading font-black text-xl sm:text-2xl shadow-[3px_3px_0_0_#111]">
            ♞
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-heading font-black text-2xl uppercase leading-none tracking-tighter">Rick.Chess</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Sokolsky Mastery</span>
          </div>
        </button>
        <nav className="flex gap-2 sm:gap-4">
          <button 
            onClick={() => { setMode('study'); setMoveIdx(0); }}
            className={cn("px-4 sm:px-6 py-2 sm:py-2.5 font-heading font-extrabold uppercase text-xs sm:text-sm tracking-widest border-[3px] border-black rounded-full transition-all flex items-center gap-2", 
              mode === 'study' ? "bg-[#3B82F6] text-white shadow-[4px_4px_0_0_#111] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111]")}
          >
            <span className="text-sm">📖</span> <span className="hidden sm:inline">Étudier</span>
          </button>
          <button 
            onClick={() => { setMode('train'); setMoveIdx(0); setTrainLine(null); }}
            className={cn("px-4 sm:px-6 py-2 sm:py-2.5 font-heading font-extrabold uppercase text-xs sm:text-sm tracking-widest border-[3px] border-black rounded-full transition-all flex items-center gap-2", 
              mode === 'train' ? "bg-[#EC4899] text-white shadow-[4px_4px_0_0_#111] -translate-y-1" : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111]")}
          >
            <span className="text-sm">⚡</span> <span className="hidden sm:inline">S'entraîner</span>
          </button>
          
          {user ? (
            <button 
              onClick={logout}
              className="px-4 py-2 sm:py-2.5 font-heading font-bold text-xs sm:text-sm tracking-widest border-[3px] border-black rounded-full transition-all flex items-center gap-2 bg-[#84CC16] text-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111]"
              title={user.email || 'Déconnexion'}
            >
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'U'}&background=random`} alt="Avatar" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-black" />
              <span className="hidden lg:inline">{user.displayName?.split(' ')[0] || 'Joueur'}</span>
            </button>
          ) : (
             <button 
              onClick={loginWithGoogle}
              className="px-4 sm:px-6 py-2 sm:py-2.5 font-heading font-extrabold uppercase text-xs sm:text-sm tracking-widest border-[3px] border-black rounded-full transition-all flex items-center gap-2 bg-black text-white hover:bg-gray-800 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111]"
            >
              <span>Connexion</span>
            </button>
          )}
        </nav>
      </header>

      {/* VIEW: LANDING */}
      {mode === 'landing' && (
        <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-500">
          {/* HUGE HERO SECTION */}
          <div className="bg-[#FEF08A] border-b-[3px] border-black py-16 sm:py-24 px-6 flex flex-col justify-center items-center overflow-hidden relative flex-1 min-h-[70vh]">
            {/* Abstract Rick background shapes */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#3B82F6] rounded-full blur-[100px] sm:blur-[120px] opacity-30 mix-blend-multiply pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#EC4899] rounded-full blur-[100px] sm:blur-[120px] opacity-30 mix-blend-multiply pointer-events-none" />
            
            <div className="text-center relative z-10 max-w-5xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-full mb-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#84CC16] animate-pulse"></span>
                Un répertoire complet et infaillible
              </div>
              <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-[110px] leading-[0.85] tracking-tighter uppercase mb-6 sm:mb-8 drop-shadow-sm">
                Maîtrisez <br/> l'Ouverture <br/> <span className="text-[#3B82F6] drop-shadow-[5px_5px_0_#111]">Sokolsky</span>
              </h1>
              <p className="font-medium text-lg sm:text-xl md:text-2xl max-w-2xl text-black/80 mb-10 sm:mb-12 px-4">
                Surprenez vos adversaires dès le premier coup (1.b4). Mémorisez les lignes, comprenez les pièges, gagnez avec audace.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-2xl px-4">
                <button 
                  onClick={() => { setMode('study'); setMoveIdx(0); }}
                  className="group flex-1 w-full bg-[#3B82F6] text-white border-[3px] border-black px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-heading font-black text-lg sm:text-xl uppercase tracking-widest shadow-[6px_6px_0_0_#111] hover:bg-[#2563EB] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#111] transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">📖</span>
                  <span>Apprendre</span>
                </button>
                <button 
                  onClick={() => { setMode('train'); startTraining(); }}
                  className="group flex-1 w-full bg-[#EC4899] text-white border-[3px] border-black px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-heading font-black text-lg sm:text-xl uppercase tracking-widest shadow-[6px_6px_0_0_#111] hover:bg-[#DB2777] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#111] transition-all flex items-center justify-center gap-3"
                >
                  <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">⚡</span>
                  <span>S'entraîner</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* FEATURES SECTION */}
          <div className="py-16 sm:py-24 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0_0_#111] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#111] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FCE300] border-[3px] border-black rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-[4px_4px_0_0_#111] mb-6">
                🧠
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tighter mb-3 sm:mb-4">Compréhension Profonde</h3>
              <p className="text-gray-600 font-medium text-base sm:text-lg">Chaque coup est expliqué avec des annotations graphiques et un texte pédagogique clair, centré sur les plans stratégiques et non la mémorisation bête.</p>
            </div>
            <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0_0_#111] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#111] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EC4899] border-[3px] border-black rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-[4px_4px_0_0_#111] mb-6">
                ⚔️
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tighter mb-3 sm:mb-4">Pièges Mortels</h3>
              <p className="text-gray-600 font-medium text-base sm:text-lg">Découvrez les fautes typiques des débutants contre b4 et punissez-les sévèrement. La grande diagonale a1-h8 n'aura plus de secrets pour vous.</p>
            </div>
            <div className="bg-white border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0_0_#111] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#111] transition-all">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#3B82F6] border-[3px] border-black rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-[4px_4px_0_0_#111] mb-6">
                🎯
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tighter mb-3 sm:mb-4">Répétition Spacée</h3>
              <p className="text-gray-600 font-medium text-base sm:text-lg">Testez vos réflexes en mode "Entraînement". L'adversaire virtuel joue les coups critiques, à vous de jouer la réponse parfaite du répertoire.</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: STUDY OR TRAIN */}
      {mode !== 'landing' && (
        <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10 pt-6 sm:pt-8 animate-in fade-in duration-300">
          
          {/* LEFT COLUMN: Sidebar variations */}
          <div className={cn("lg:col-span-3 space-y-4", mode === 'train' ? "hidden lg:block opacity-50 pointer-events-none grayscale" : "block")}>
            <div className="bg-white border-[3px] border-black rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0_0_#111] max-h-[50vh] lg:max-h-[calc(100vh-140px)] overflow-y-auto">
              <h2 className="font-heading font-black text-xl uppercase tracking-tighter mb-4 border-b-[3px] border-black pb-2 flex justify-between items-center">
                Variantes <span className="text-xs bg-black text-white px-2 py-0.5 rounded-md font-body">108</span>
              </h2>
              {Object.entries(
                REPERTOIRE.reduce((acc, line, idx) => {
                  if (!acc[line.category]) acc[line.category] = [];
                  acc[line.category].push({ line, idx });
                  return acc;
                }, {} as Record<string, { line: typeof REPERTOIRE[0], idx: number }[]>)
              ).map(([category, items]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-[#EC4899] mb-3 ml-2 border-b-2 border-dashed border-black/10 pb-1">{category}</h3>
                  <div className="space-y-2">
                    {items.map(({ line, idx }) => {
                      const isActive = mode === 'study' && lineIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => { setMode('study'); handleSelectLine(idx); }}
                          className={cn(
                            "block w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-[3px] font-bold text-xs sm:text-sm transition-all relative overflow-hidden",
                            isActive ? "border-black bg-[#FCE300] shadow-[3px_3px_0_0_#111] translate-x-1" : "border-transparent hover:border-black/20 text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black" />}
                          <span className={cn("inline-block", isActive ? "text-black pl-1" : "text-gray-800")}>{line.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE COLUMN: Chess board */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[500px]">
              <div className="bg-white border-[3px] border-black p-2 sm:p-4 rounded-3xl shadow-[6px_6px_0_0_#111] sm:shadow-[8px_8px_0_0_#111] mb-6 relative">
                <Board 
                  game={game} 
                  orientation="white" 
                  lastMove={lastMove}
                  hintSquare={hintSquare}
                  selectedSquare={selectedSquare}
                  onSquareClick={handleSquareClick}
                  annotations={
                    (mode === 'study' || mode === 'train') ? {
                      arrows: currentAnnotation?.arrows,
                      circles: currentAnnotation?.circles
                    } : undefined
                  }
                />
              </div>
              
              {/* STUDY Board Controls */}
              {mode === 'study' && activeLine && (
                <div className="flex justify-between items-center bg-white border-[3px] border-black rounded-full p-2 shadow-[4px_4px_0_0_#111]">
                  <button onClick={() => setMoveIdx(0)} disabled={moveIdx === 0} className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center font-black text-lg sm:text-xl rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors">⏮</button>
                  <button onClick={() => setMoveIdx(m => Math.max(0, m - 1))} disabled={moveIdx === 0} className="px-3 sm:px-6 h-10 sm:h-14 font-heading font-extrabold uppercase rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors text-[10px] sm:text-sm">Précédent</button>
                  <button onClick={() => setMoveIdx(m => Math.min(activeLine.moves.length, m + 1))} disabled={moveIdx >= activeLine.moves.length} className="px-3 sm:px-6 h-10 sm:h-14 font-heading font-extrabold text-white bg-black uppercase rounded-full hover:bg-gray-800 transition-colors disabled:opacity-30 text-[10px] sm:text-sm">Suivant</button>
                  <button onClick={() => setMoveIdx(activeLine.moves.length)} disabled={moveIdx >= activeLine.moves.length} className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center font-black text-lg sm:text-xl rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors">⏭</button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Info / Comments */}
          <div className="lg:col-span-4 h-full flex flex-col gap-6 w-full">
            
            {mode === 'train' ? (
              // TRAIN MODE PANEL
              <div className="space-y-4 sm:space-y-6">
                 <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="bg-white border-[3px] border-black rounded-2xl p-3 sm:p-4 text-center shadow-[4px_4px_0_0_#111]">
                      <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Réussis</div>
                      <div className="text-2xl sm:text-3xl font-black text-[#84CC16]">{trainStats.good}</div>
                    </div>
                    <div className="bg-white border-[3px] border-black rounded-2xl p-3 sm:p-4 text-center shadow-[4px_4px_0_0_#111]">
                       <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Ratés</div>
                       <div className="text-2xl sm:text-3xl font-black text-[#EC4899]">{trainStats.bad}</div>
                    </div>
                    <div className="bg-white border-[3px] border-black rounded-2xl p-3 sm:p-4 text-center shadow-[4px_4px_0_0_#111]">
                       <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Série</div>
                       <div className="text-2xl sm:text-3xl font-black text-[#3B82F6]">{trainStats.streak}</div>
                    </div>
                 </div>

                 <div className={cn(
                   "border-[3px] border-black rounded-2xl p-4 sm:p-6 font-bold text-center shadow-[4px_4px_0_0_#111] transition-colors text-sm sm:text-lg",
                   trainStatus.type === 'ready' && "bg-[#FCE300]",
                   trainStatus.type === 'success' && "bg-[#84CC16] text-white",
                   trainStatus.type === 'error' && "bg-[#EC4899] text-white",
                   trainStatus.type === 'info' && "bg-white"
                 )}>
                   {trainStatus.msg}
                 </div>

                 <div className="grid grid-cols-2 gap-3 sm:gap-4">
                   <button onClick={startTraining} className="col-span-2 py-3 sm:py-4 bg-black text-white font-heading font-black uppercase tracking-widest border-[3px] border-black rounded-xl transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111] text-sm sm:text-lg">
                     Nouvelle Ligne
                   </button>
                   <button onClick={showHint} disabled={!trainLine} className="py-3 sm:py-4 bg-[#FCE300] text-black font-heading font-bold uppercase tracking-widest border-[3px] border-black rounded-xl transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none text-xs sm:text-sm">
                     Indice
                   </button>
                   <button onClick={showAnswer} disabled={!trainLine} className="py-3 sm:py-4 bg-[#EC4899] text-white font-heading font-bold uppercase tracking-widest border-[3px] border-black rounded-xl transition hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none text-xs sm:text-sm">
                     Réponse
                   </button>
                 </div>
                 
                 {/* Show comment if answered */}
                 {currentAnnotation?.comment && trainHadError && (
                   <div className="bg-white border-[3px] border-black rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0_0_#111] mt-4 sm:mt-6 animate-in fade-in zoom-in-95">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#3B82F6] text-white px-3 py-1 rounded-full font-black text-xs sm:text-sm border-2 border-black">
                        {Math.ceil(activeMoveIndex / 2)}.{activeMoveIndex % 2 === 0 ? ".." : ""}{currentAnnotation.san}
                      </span>
                      <span className="font-heading font-bold uppercase tracking-widest text-[#EC4899] text-xs sm:text-sm">💡 Conseil tactique</span>
                    </div>
                    <div className="text-sm sm:text-lg leading-relaxed font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: currentAnnotation.comment }} />
                   </div>
                 )}
              </div>
            ) : (
              // STUDY MODE PANEL
              <div className="bg-white border-[3px] border-black rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0_0_#111] lg:h-[calc(100vh-250px)] min-h-[350px] sm:min-h-[400px] flex flex-col">
                <div className="flex justify-between items-start mb-4 sm:mb-6 border-b-[3px] border-black pb-4 shrink-0">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Analyse Strategique</div>
                    <div className="text-3xl sm:text-4xl font-black tracking-tighter text-[#3B82F6]">
                      {activeMoveIndex === 0 ? "START" : 
                       <span className="flex items-center gap-2">
                         {Math.ceil(activeMoveIndex / 2)}.{activeMoveIndex % 2 === 0 ? ".." : ""}{currentAnnotation?.san}
                       </span>
                      }
                    </div>
                  </div>
                  {activeMoveIndex > 0 && currentAnnotation?.arrows?.length ? (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#84CC16] border-[3px] border-black rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#111]">
                      <span className="font-black text-white text-lg sm:text-xl">✓</span>
                    </div>
                  ) : null}
                </div>

                <div className="mb-4 sm:mb-6 shrink-0">
                  {activeMoveIndex === 0 ? (
                    <div className="bg-[#f0f9ff] border-2 border-[#bae6fd] p-3 sm:p-4 rounded-xl text-sm sm:text-lg text-[#0369a1] font-medium">Naviguez avec les flèches ou les boutons de la barre de contrôle pour étudier chaque coup de la variante étape par étape.</div>
                  ) : (
                    <div className="text-sm sm:text-lg leading-relaxed font-medium text-gray-800" dangerouslySetInnerHTML={{ __html: currentAnnotation?.comment || '<em class="text-gray-400">Le plan suit son cours. Sortez vos pièces et luttez pour le centre.</em>' }} />
                  )}
                </div>

                {/* Move list */}
                <div className="flex-1 bg-[#fdfaf6] border-[3px] border-black rounded-xl p-3 sm:p-4 overflow-y-auto shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
                  <div className="text-[10px] uppercase font-black tracking-widest text-[#EC4899] mb-3 sm:mb-4 border-b-2 border-dashed border-black/20 pb-2">Déroulé théorique</div>
                  {activeLine && (
                    <div className="space-y-1">
                      {Array.from({ length: Math.ceil(activeLine.moves.length / 2) }).map((_, i) => {
                        const whiteMoveIdx = i * 2;
                        const blackMoveIdx = i * 2 + 1;
                        const whiteMove = activeLine.moves[whiteMoveIdx];
                        const blackMove = activeLine.moves[blackMoveIdx];

                        return (
                          <div key={i} className="grid grid-cols-[20px_1fr_1fr] sm:grid-cols-[30px_1fr_1fr] items-center gap-1 sm:gap-2 py-1">
                            <span className="font-black text-gray-400 text-xs sm:text-sm text-right pr-1 sm:pr-2">{i + 1}.</span>
                            <button 
                              onClick={() => setMoveIdx(whiteMoveIdx + 1)}
                              className={cn(
                                "text-left px-2 sm:px-3 py-1.5 rounded-md font-bold transition-all border-2 text-[10px] sm:text-sm",
                                activeMoveIndex === whiteMoveIdx + 1 ? "bg-black text-white border-black scale-[1.02]" : "border-transparent text-gray-700 hover:bg-gray-200"
                              )}>
                                {whiteMove?.san}
                            </button>
                            <button 
                              onClick={() => blackMove && setMoveIdx(blackMoveIdx + 1)}
                              disabled={!blackMove}
                              className={cn(
                                "text-left px-2 sm:px-3 py-1.5 rounded-md font-bold transition-all border-2 text-[10px] sm:text-sm",
                                !blackMove && "opacity-0",
                                activeMoveIndex === blackMoveIdx + 1 ? "bg-[#3B82F6] text-white border-black shadow-[2px_2px_0_0_#111] scale-[1.02]" : "border-transparent text-gray-700 hover:bg-gray-200"
                              )}>
                                {blackMove?.san}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
      
      <footer className={cn("mt-auto border-t-[3px] border-black bg-white p-4 sm:p-6 flex justify-between items-center z-10 w-full relative", mode === 'landing' ? "mt-0" : "mt-8")}>
        <div className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tighter flex items-center gap-2">
          <span className="text-[#EC4899]">Rick</span>.Chess
        </div>
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">© 2026 Sokolsky Mastery</div>
      </footer>
    </div>
  );
}
