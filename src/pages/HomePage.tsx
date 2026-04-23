import { RepertoireMenu } from "../components/RepertoireMenu";
import type { RepertoireLine } from "../data/repertoire";
import type { SessionMode } from "../engine/types";

interface HomePageProps {
  onStart: (queue: RepertoireLine[], mode: SessionMode) => void;
  onAdmin: () => void;
}

export function HomePage({ onStart, onAdmin }: HomePageProps) {
  return (
    <>
      <RepertoireMenu onStart={onStart} />
      {["localhost", "127.0.0.1"].includes(window.location.hostname) && (
        <div className="max-w-3xl mx-auto px-4 pb-6">
          <button
            onClick={onAdmin}
            className="w-full py-3 px-4 rounded-xl bg-gray-800 text-gray-300 font-semibold text-sm border-2 border-gray-600 hover:bg-gray-700 transition shadow"
          >
            ⚙️ Mode Admin — Éditer le répertoire
          </button>
        </div>
      )}
    </>
  );
}
