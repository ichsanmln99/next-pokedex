import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { LocalPokemonInfo } from "@/models/pokemon.interface";

export default function usePokemonLocalData() {
  const [cookies] = useCookies(["pokemon"]);
  const [catchPokemonList, setCatchPokemonList] = useState<LocalPokemonInfo[]>(
    []
  );
  useEffect(() => {
    if (cookies.pokemon) {
      setCatchPokemonList(cookies.pokemon.list);
    }
  }, [cookies.pokemon]);

  return catchPokemonList;
}
