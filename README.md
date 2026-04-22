<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Sokolsky (1.b4) — répertoire d'entraînement

App React + TypeScript d'entraînement sur l'ouverture Sokolsky, avec un
flux d'apprentissage inspiré de Chessable.

## Run Locally

**Prerequisites:** Node.js 20+

1. `npm install`
2. `npm run dev`

## Flux LEARN → PRACTICE

Le cœur de l'app est `src/engine/useSession.ts` : une machine à états qui gère
la traversée d'une variante dans deux modes.

### Mode LEARN (apprentissage guidé)

- Le plateau démarre à la position initiale de la variante.
- Pour chaque coup `i` de `line.moves` :
  - Le coup est annoncé, avec son commentaire, ses flèches et ses cercles.
  - L'utilisateur clique **« Coup suivant »** _ou_ joue le coup correct sur le
    plateau → on avance à `i+1`.
  - Les coups adverses (noirs) ne sont pas auto-joués en LEARN : le joueur
    contrôle entièrement le rythme.
- À la fin de la variante, un bouton **« Variante terminée ✓ »** apparaît.
  Cliquer dessus :
  1. Marque la variante `learned = true` dans `localStorage`.
  2. Bascule **automatiquement** en mode PRACTICE sur la MÊME ligne
     (plateau remis à zéro, stats neuves).

### Mode PRACTICE (entraînement actif)

- Plateau en position initiale de la variante. Annotations / flèches / cercles
  **masquées**.
- Les coups adverses (noirs) sont **auto-joués** après un délai de 500 ms.
- À chaque coup blanc attendu :
  - Bon coup → compté comme « parfait », on avance.
  - Mauvais coup légal → compteur d'essais `● ● ●` incrémenté.
  - Coup illégal → ignoré (pas compté comme erreur).
  - Après **3 erreurs** : la solution est révélée (flèche verte + commentaire).
    L'utilisateur clique « Continuer » → le coup est compté « avec aide » et
    on avance.
- À la fin : écran `SessionComplete` avec le score, bouton
  **« Variante suivante → »** si la queue en contient une autre.

### Points d'entrée

- **Apprendre** (depuis le menu, sur une ligne) → LEARN puis bascule PRACTICE.
- **Entraîner** (depuis le menu) → PRACTICE direct sur une ligne, un
  sous-chapitre, ou un chapitre entier.
- **🎯 Réviser l'essentiel** → PRACTICE sur toutes les lignes `must-know`.

## Architecture

```
src/
├── data/repertoire.ts          (répertoire — source de vérité, non modifiée)
├── engine/
│   ├── types.ts                (SessionMode, SessionPhase, SessionState, …)
│   ├── progressStore.ts        (persistance localStorage, clé: sokolsky.progress.v1)
│   └── useSession.ts           (hook + reducer, state machine complète)
├── components/
│   ├── ChessboardPanel.tsx     (wrapper react-chessboard + flèches/cercles)
│   ├── LearnPanel.tsx          (UI mode LEARN)
│   ├── PracticePanel.tsx       (UI mode PRACTICE + compteur d'essais)
│   ├── SessionComplete.tsx     (écran de fin de ligne / session)
│   └── RepertoireMenu.tsx      (navigation chapitres + boutons)
└── App.tsx                     (shell, branche menu ↔ panels selon le state)
```

La persistance se fait **uniquement en localStorage** (pas de Firebase pour
l'instant). Les données sont stockées sous la clé `sokolsky.progress.v1` au
format `Record<lineName, LineProgress>`.
