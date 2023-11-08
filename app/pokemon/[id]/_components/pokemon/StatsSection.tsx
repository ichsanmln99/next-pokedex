import { Pokemon } from "@/models/pokemon.interface";

export default function StatsSection({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex flex-col gap-4">
      {pokemon.stats.map((stat, index) => (
        <div key={index}>
          <div className="flex justify-between mb-1 text-sm">
            <div className="capitalize font-semibold">{stat.stat.name}</div>
            <div>{stat.base_stat}</div>
          </div>
          <div>
            <div className="w-full h-2 bg-slate-200 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${(stat.base_stat / 200) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
