import prisma from "./prisma";

import type { PokemonBasic } from "@/lib/types/pokemon";

const ITEMS_PER_PAGE = 10;

/**
 * Fetches a list of Pokemon representing one pagination page
 */
export async function fetchPokemonList(page: number, search: string): Promise<PokemonBasic[]> {
  const OFFSET = ITEMS_PER_PAGE * (page - 1);

  const listData = await prisma.pokemon.findMany({
    where: {
      name: {
        contains: search,
      },
      is_default: true,
    },
    select: {
      id: true,
      name: true,
      image_url: true,
      types: {
        select: {
          id: true,
          name: true,
        },
      },
      species: {
        select: {
          full_name: true,
        },
      },
    },
    skip: OFFSET,
    take: ITEMS_PER_PAGE,
  });

  const pokemonList = listData.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      full_name: pokemon.species.full_name,
      image_url: pokemon.image_url,
      types: pokemon.types,
    } satisfies PokemonBasic;
  });
  return pokemonList;
}

