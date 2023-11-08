import { request } from "@/api/request";
import { NamedAPIResourceList } from "../models/common.interface";
import { Pokemon } from "../models/pokemon.interface";

const ENDPOINT = "https://pokeapi.co/api/v2/";

export function getPokemonList(
  limit: number,
  offset: number
): Promise<NamedAPIResourceList> {
  return request<NamedAPIResourceList>(
    `${ENDPOINT}pokemon?limit=${limit}&offset=${offset}`
  );
}

export function getPokemon(key: string): Promise<Pokemon> {
  return request<Pokemon>(`${ENDPOINT}pokemon/${key}`);
}
