"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function CatchMenuButton() {
  const [cookies] = useCookies(["pokemon"]);
  const [totalPokemonCatch, setTotalPokemonCatch] = useState(0);

  useEffect(() => {
    if (cookies.pokemon) {
      setTotalPokemonCatch(cookies.pokemon.list.length);
    }
  }, [cookies.pokemon]);

  return (
    <Link href={"/pokemon/catch"}>
      <button className="bg-slate-100 py-3 px-5 font-semibold hover:bg-yellow-400 active:bg-yellow-500 rounded-full w-full flex items-center gap-2 justify-center group capitalize text-sm">
        {totalPokemonCatch} Catch
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
  );
}
