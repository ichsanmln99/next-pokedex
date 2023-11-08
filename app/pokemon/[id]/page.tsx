import { getPokemon } from "@/api/pokemon";
import PokemonInfo from "./_components/pokemon/PokemonInfo";
import PokemonCatch from "./_components/catch/PokemonCatch";

export default async function PokemonPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const pokemon = await getPokemon(id);

  return (
    <main className="py-40">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        <PokemonCatch pokemon={pokemon}></PokemonCatch>
        <PokemonInfo pokemon={pokemon}></PokemonInfo>
      </div>
    </main>
  );
}
