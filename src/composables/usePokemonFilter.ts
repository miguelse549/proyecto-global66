import type {
  PokemonDetail,
  PokemonDetailFiltered,
} from "../services/interfaces";

export const usePokemonFilter = () => {
  const filterPokemonDetails = (
    pokemon: PokemonDetail
  ): PokemonDetailFiltered => {
    return {
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types
        .map((typeInfo: any) => typeInfo.type.name)
        .join(", "),
      isFavorite: false,
    };
  };

  return {
    filterPokemonDetails,
  };
};
