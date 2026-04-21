// src/lib/sounds.ts
// Web Audio API minimal synth sound effects to avoid asset dependency issues.

let audioCtx: AudioContext | null = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Helper to create a quick envelope
function playTone(freq: number, type: OscillatorType, duration: number, vol = 0.5, attack = 0.01, release = 0.1, freqSweep?: { to: number, time: number }) {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (freqSweep) {
    osc.frequency.exponentialRampToValueAtTime(freqSweep.to, ctx.currentTime + freqSweep.time);
  }

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + attack);
  gain.gain.setValueAtTime(vol, ctx.currentTime + duration - release);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

// Standard Move: Wooden knock
export function playMoveSound() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.8, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

// Capture: Sharper knock
export function playCaptureSound() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc2.type = 'square';
  
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);
  osc2.frequency.setValueAtTime(300, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.08);
  osc2.stop(ctx.currentTime + 0.08);
}

// Castle: Double hit
export function playCastleSound() {
  playMoveSound();
  setTimeout(() => playMoveSound(), 100);
}

// Error: Buzzer
export function playErrorSound() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.4, ctx.currentTime + 0.2);
  gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

// Success: Nice Chime
export function playSuccessSound() {
  playTone(440, 'sine', 0.15, 0.3, 0.01, 0.05);
  setTimeout(() => playTone(660, 'sine', 0.4, 0.3, 0.01, 0.3), 100);
}
