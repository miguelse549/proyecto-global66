interface PokemonList {
  name: string;
}

interface PokemonDetail {
  name: string;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
}

interface PokemonDetailFiltered {
  name: string;
  weight: number;
  height: number;
  types: string;
  isFavorite: boolean;
}

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonList[];
}
export type {
  PokemonApiResponse,
  PokemonList,
  PokemonDetail,
  PokemonDetailFiltered,
};
