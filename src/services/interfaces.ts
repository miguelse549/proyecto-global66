interface PokemonList {
  name: string;
  isFavorite: boolean;
}

interface PokemonDetail {
  name: string;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  sprites: any;
}

interface PokemonDetailFiltered {
  name: string;
  weight: number;
  height: number;
  types: string;
  isFavorite: boolean;
  image: string;
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
