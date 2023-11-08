import { Pokemon } from "@/models/pokemon.interface";
import colors from "@/helper/pokemonTypeColors";

export default function AboutSection({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-3">
        <span className="font-semibold">Types</span>
        <div className="col-span-2">
          <div className="flex gap-1">
            {pokemon.types.map((type, index) => (
              <div
                style={{ background: colors[type.type.name] }}
                className="rounded-full px-2 text-xs text-white"
                key={index}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <span className="font-semibold">Height</span>
        <span className="col-span-2">
          {(pokemon.height * 0.1).toFixed(1)} (m)
        </span>
      </div>
      <div className="grid grid-cols-3">
        <span className="font-semibold">Weight</span>
        <span className="col-span-2">
          {(pokemon.weight * 0.1).toFixed(1)} (kg)
        </span>
      </div>
      <div className="grid grid-cols-3">
        <span className="font-semibold">Abilities</span>
        <div className="col-span-2">
          {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
        </div>
      </div>
      <div className="grid grid-cols-3">
        <span className="font-semibold">Experience</span>
        <span className="col-span-2">{pokemon.base_experience} (Base Exp)</span>
      </div>
    </div>
  );
}
