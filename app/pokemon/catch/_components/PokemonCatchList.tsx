"use client";
import PokemonCard from "@/app/_components/pokemon/PokemonCard";
import PokemonListSkeleton from "@/app/_components/pokemon/PokemonListSkeleton";
import { LocalPokemonInfo } from "@/models/pokemon.interface";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function PokemonCatchList() {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["pokemon"]);
  const [catchPokemonList, setCatchPokemonList] = useState<LocalPokemonInfo[]>(
    []
  );

  const removePokemon = (nickname: string) => {
    if (catchPokemonList.length > 0) {
      setCookie(
        "pokemon",
        {
          list: catchPokemonList.filter(
            (pokemon) => pokemon.nickname != nickname
          ),
        },
        { path: "/" }
      );
    }
  };

  useEffect(() => {
    if (cookies.pokemon) {
      setCatchPokemonList(cookies.pokemon.list);
    }
    setIsLoading(false);
  }, [cookies.pokemon]);

  return (
    <div>
      {catchPokemonList.length > 0 && (
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-8 gap-4">
          {catchPokemonList.map((pokemon, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => removePokemon(pokemon.nickname)}
                className="absolute top-3 right-3 z-10 bg-red-400 hover:bg-red-500 active:bg-red-600 text-white cursor-pointer rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <Icon icon="ic:round-close"></Icon>
              </button>

              <PokemonCard
                name={pokemon.name}
                id={pokemon.id}
                customName={pokemon.nickname}
              ></PokemonCard>
            </div>
          ))}

          {isLoading && PokemonListSkeleton(6)}
        </div>
      )}

      {catchPokemonList.length === 0 && (
        <div className="flex justify-center">
          <div className="text-center flex-col flex gap-8 py-20">
            <h2>You have no Pokemon yet.</h2>
            <div>
              <Link href={"/"}>
                <button className="bg-slate-100 py-3 px-5 font-semibold hover:bg-yellow-400 active:bg-yellow-500 rounded-full w-full flex items-center gap-2 justify-center group capitalize text-sm">
                  Go a Catch Pokemon
                  <div className="w-4 h-4 relative">
                    <Image
                      fill={true}
                      src="/pokeball.png"
                      style={{ objectFit: "contain" }}
                      alt=""
                    />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PokemonCatchListEmpty() {}
