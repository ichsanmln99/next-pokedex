"use client";
import usePokemonLocalData from "@/app/_utils/usePokemonLocalData";
import { useEffect, useState } from "react";
import { getPokemonList } from "@/api/pokemon";
import { NamedAPIResource } from "@/models/common.interface";
import PokemonCard from "./PokemonCard";
import PokemonListSkeleton from "./PokemonListSkeleton";

export default function PokemonList() {
  const LIST_LIMIT = 24;
  const [pokemonList, setPokemonList] = useState<NamedAPIResource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const catchPokemonList = usePokemonLocalData();

  const fetchPokemonList = async (limit: number, offset: number) => {
    setIsLoading(true);

    getPokemonList(limit, offset)
      .then((list) => {
        setPokemonList([...pokemonList, ...list.results]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isPokemonOwned = (id: number) =>
    !!catchPokemonList.find((pokemon) => pokemon.id === id);

  useEffect(() => {
    fetchPokemonList(LIST_LIMIT, 0);
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-4">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            id={index + 1}
            owned={isPokemonOwned(index + 1)}
          ></PokemonCard>
        ))}

        {isLoading && PokemonListSkeleton(LIST_LIMIT)}
      </div>

      {pokemonList && !isLoading && (
        <div className="mt-10 text-center">
          <button
            onClick={() => fetchPokemonList(LIST_LIMIT, pokemonList.length)}
            className="bg-slate-300 px-10 py-4 rounded-full font-semibold hover:bg-slate-400 active:bg-slate-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
