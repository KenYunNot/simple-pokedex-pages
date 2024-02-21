import prisma from "@/lib/db";
import type { PokemonBasic } from "@/lib/types/pokemon";

import { GetServerSidePropsContext } from "next";

import PokemonCard from "@/lib/ui/components/pokemon-card";
import { Fragment } from "react";


export default function Pokedex({ pokemonList } : { pokemonList: PokemonBasic[] }) {
  return (
    <div>
      {pokemonList.map(pokemon => {
        return (
          <Fragment key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Fragment>
        )
      })}
    </div>
  )
}

const ITEMS_PER_PAGE = 10;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const page = Number(query.page) || 1;
  const search = query.search ? String(query.search) : "";
  const OFFSET = ITEMS_PER_PAGE * (page - 1);

  const pokemonList: PokemonBasic[] = await prisma.pokemon.findMany({
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
    },
    skip: OFFSET,
    take: ITEMS_PER_PAGE,
  });

  return {
    props: {
      pokemonList,
    }
  }
}