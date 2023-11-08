import { Pokemon } from "@/models/pokemon.interface";

export default function MovesSection({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 h-72 overflow-y-scroll md:px-3">
        {pokemon.moves.map((move, index) => (
          <div
            className="text-center text-sm border-slate-300 border border-dashed py-2 hover:border-yellow-400"
            key={index}
          >
            {move.move.name}
          </div>
        ))}
      </div>
    </div>
  );
}
