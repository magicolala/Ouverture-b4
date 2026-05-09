import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lichessAnalysisUrl(fen: string) {
  return `https://lichess.org/analysis/${fen.replace(/ /g, "_")}?color=white`;
}

export function lichessGameUrl(gameId: string) {
  return `https://lichess.org/${gameId}/white`;
}
