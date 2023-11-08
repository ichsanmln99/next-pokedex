import PokemonCatchList from "./_components/PokemonCatchList";

export default function PokemonCatchPage() {
  return (
    <div className="max-w-5xl mx-auto pt-10">
      <div className="bg-white lg:p-10 px-4 py-6 rounded-3xl ">
        <PokemonCatchList></PokemonCatchList>
      </div>
    </div>
  );
}
