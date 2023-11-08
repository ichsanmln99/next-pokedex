"use client";

import { Pokemon, LocalPokemonInfo } from "@/models/pokemon.interface";
import colors from "@/helper/pokemonTypeColors";
import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";
import CatchModal from "./CatchModal";
import usePokemonLocalData from "@/app/_utils/usePokemonLocalData";

export default function PokemonCatch({ pokemon }: { pokemon: Pokemon }) {
  const POKEMON_GIF = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;
  const POKEMON_PNG = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  const [cookies, setCookies] = useCookies(["pokemon"]);
  const [pokemonImage, setPokemonImage] = useState(POKEMON_GIF);
  const [catchModalOpen, setCatchModalOpen] = useState(false);
  const catchPokemonList = usePokemonLocalData();

  const openCatchModal = () => setCatchModalOpen(true);
  const closeCatchModal = () => setCatchModalOpen(false);

  const storePokemon = (pokemonInfo: LocalPokemonInfo) => {
    const pokemonList = { list: [pokemonInfo] };

    if (catchPokemonList)
      pokemonList.list = [...pokemonList.list, ...catchPokemonList];

    setCookies("pokemon", pokemonList, { path: "/" });
  };

  const isPokemonOwned = (id: number) =>
    !!catchPokemonList.find((pokemon) => pokemon.id === id);

  return (
    <div>
      <div className="bg-white p-10 rounded-3xl relative pt-32 w-full">
        <div className="w-64 h-64 flex p-10 justify-center items-end  absolute -top-32 right-1/2 translate-x-1/2">
          <Image
            src={pokemonImage}
            quality={100}
            alt="pokemon logo"
            fill={true}
            style={{ imageRendering: "pixelated", objectFit: "contain" }}
            onError={(e) => {
              setPokemonImage(POKEMON_PNG);
            }}
          ></Image>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="flex gap-1 items-center">
            {isPokemonOwned(pokemon.id) && (
              <div className="w-4 h-4 relative">
                <Image src="/poke-owned.png" fill={true} alt="owned"></Image>
              </div>
            )}
            <p className=" font-semibold opacity-70">N° {pokemon.id}</p>
          </div>
          <h1 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h1>

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
        <div className="text-center">
          <button
            onClick={() => openCatchModal()}
            className="bg-slate-100 text-lg py-3 px-5 font-semibold hover:bg-yellow-400 active:bg-yellow-500 rounded-full w-full flex items-center gap-2 justify-center group capitalize"
          >
            <div className="w-8 h-8 relative">
              <Image
                fill={true}
                src="/pokeball.png"
                style={{ objectFit: "contain" }}
                alt=""
                className="animate-bounce"
              />
            </div>
            Catch {pokemon.name}
          </button>
        </div>
      </div>

      {catchModalOpen && (
        <CatchModal
          id={pokemon.id}
          name={pokemon.name}
          isOpen={catchModalOpen}
          onClose={closeCatchModal}
          onSuccess={storePokemon}
        ></CatchModal>
      )}
    </div>
  );
}
