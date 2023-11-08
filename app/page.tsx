import Image from "next/image";
import PokemonList from "./_components/pokemon/PokemonList";

export default async function Home() {
  return (
    <main>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center lg:py-20 py-8">
          <Image
            src="/pokemon-logo.png"
            width={200}
            height={100}
            quality={100}
            alt="pokemon logo"
            className="w-1/2 lg:w-auto"
            style={{ imageRendering: "pixelated" }}
          ></Image>
        </div>
        <div className="bg-white lg:p-10 px-4 py-6 rounded-3xl ">
          <PokemonList></PokemonList>
        </div>
      </div>
    </main>
  );
}
