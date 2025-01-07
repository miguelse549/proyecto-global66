import httpClientPlugin from "../plugins/http-client.plugin";
import {
  POKEMON_API_BASE_URL,
  POKEMON_API_BY_NAME_URL,
} from "../constants/urls";
import type {
  PokemonApiResponse,
  PokemonList,
  PokemonDetail,
  PokemonDetailFiltered,
} from "./interfaces";
import { usePokemonFilter } from "../composables/usePokemonFilter";

const { filterPokemonDetails } = usePokemonFilter();

export const getListPokemon = async (): Promise<PokemonList[]> => {
  const { results } = await httpClientPlugin.get<PokemonApiResponse>(
    POKEMON_API_BASE_URL
  );
  return results;
};

export const getDetailsPokemon = async (
  name: string
): Promise<PokemonDetailFiltered> => {
  const pokemon = await httpClientPlugin.get<PokemonDetail>(
    POKEMON_API_BY_NAME_URL(name)
  );

  return filterPokemonDetails(pokemon);
};
