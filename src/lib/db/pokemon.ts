import prisma from "./prisma";

import type { AdjacentPokemon, PokemonBasic, Pokemon } from "@/lib/types/pokemon";

const ITEMS_PER_PAGE = 10;

/**
 * Fetches a list of Pokemon representing one pagination page
 */
export async function fetchPokemonList(
  page: number,
  search: string
): Promise<PokemonBasic[]> {

  const OFFSET = ITEMS_PER_PAGE * (page - 1);

  // Fetch the record from the db
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

  // Spread nested objects for each record in the list and return the result
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

/**
 * Fetches individual Pokemon by name
 */
export async function fetchPokemonByName(name: string): Promise<Pokemon | null> {
  // Fetch the record from the db
  const pokemon = await prisma.pokemon.findFirst({
    where: {
      name,
    },
    include: {
      species: {
        select: {
          name: true,
          left_name: true,
          right_name: true,
          full_name: true,
          left_full_name: true,
          right_full_name: true,
          flavor_texts: true,
          genus: true,
          gender_rate: true,
          is_legendary: true,
          is_mythical: true,
        },
      },
      types: {
        include: {
          double_damage_from: true,
          double_damage_to: true,
          half_damage_from: true,
          half_damage_to: true,
          no_damage_from: true,
          no_damage_to: true,
        }
      },
    },
  });

  if (!pokemon) {
    return null;
  }

  // If id is greater than 1, left will always exist
  // If id is less than count, right will always exist
  const count = await countPokemon();
  let left: AdjacentPokemon | null = null;
  let right: AdjacentPokemon | null = null;
  if (pokemon.id > 1) {
    left = {
      id: pokemon.id-1,
      name: String(pokemon.species.left_name),
      full_name: String(pokemon.species.left_full_name),
    }
  }
  if (pokemon.id < count) {
    right = {
      id: pokemon.id+1,
      name: String(pokemon.species.right_name),
      full_name: String(pokemon.species.right_full_name),
    }
  }

  // Spread nested objects and return the result
  return {
    id: pokemon.id,
    name: pokemon.name,
    full_name: pokemon.species.full_name,
    abilities: pokemon.abilities,
    image_url: pokemon.image_url,
    height: pokemon.height,
    weight: pokemon.weight,
    genus: pokemon.species.genus ?? "n/a",
    flavor_texts: pokemon.species.flavor_texts,
    gender_rate: pokemon.species.gender_rate,
    left,
    right,
    is_default: pokemon.is_default,
    types: pokemon.types,
  };
}

/**
 * Count the number of Pokemon records
*/
export async function countPokemon() {
  const count = await prisma.pokemon.count();
  return count;
}

/**
 * Count the total number of Pokemon record pages based on a query string
 */
export async function countPokemonPages(query: string) {
  const count = await prisma.pokemon.count({
    where: {
      name: {
        contains: query,
      }
    }
  });
  return Math.ceil(count / ITEMS_PER_PAGE);
}