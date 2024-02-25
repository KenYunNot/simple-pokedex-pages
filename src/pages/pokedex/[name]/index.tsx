import type { GetStaticPropsContext } from "next";
import type { AdjacentPokemon, Pokemon } from "@/lib/types/pokemon";

import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import NotFound from "@/pages/404";
import PokemonDataTable from "@/lib/ui/components/pokemon-data-table";
import TypeDefensesTable from "@/lib/ui/components/type-defenses-table";
import TypeIcon from "@/lib/ui/components/type-icon";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid/index.js";

import { fetchPokemonByName } from "@/lib/db/pokemon";

import clsx from "clsx";


export default function PokedexEntry({ pokemon }: { pokemon: Pokemon | null }) {
  if (!pokemon) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center gap-3 py-3">
      <div className="w-full table clear-both my-1 px-2">
        {!!pokemon.left && (
          <AdjacentLink direction="left" adjPokemon={pokemon.left} />
        )}
        {!!pokemon.right && (
          <AdjacentLink direction="right" adjPokemon={pokemon.right} />
        )}
      </div>
      <h1 className="pb-3 text-3xl text-center font-semibold">
        {pokemon.full_name}
        <span className="block text-gray-400">
          #{String(pokemon.id).padStart(4, "0")}
        </span>
      </h1>
      <Image
        src={pokemon.image_url}
        width={400}
        height={400}
        alt={`Image of ${pokemon.full_name}`}
        className="bg-gray-200 rounded-md"
      />
      <div className="flex justify-center gap-1 p-2">
        {pokemon.types.map((type) => {
          return (
            <Fragment key={type.id}>
              <TypeIcon name={type.name} />
            </Fragment>
          );
        })}
      </div>
      <section>
        <h2 className="py-2 font-semibold">Pokedex Data</h2>
        <PokemonDataTable pokemon={pokemon} />
      </section>
      <section>
        <h2 className="py-2 font-semibold">Type Defenses</h2>
        <TypeDefensesTable types={pokemon.types} />
      </section>
    </div>
  );
}

function AdjacentLink({ 
  direction, 
  adjPokemon 
} : { 
  direction: "left" | "right", 
  adjPokemon: AdjacentPokemon 
}) {
  const linkStyle = clsx(
    "flex items-center px-1 text-blue-600 hover:bg-gray-200 hover:underline",
    {
      "float-left rounded-l-lg" : direction === 'left',
      "float-right rouned-r-lg" : direction === 'right',
    }
  )

  return (
    <Link 
      href={`/pokedex/${adjPokemon.name}`} 
      className={linkStyle}
    >
      {direction === 'left' && <ChevronLeftIcon className="w-5 h-5" />}
      {`${String(adjPokemon.id).padStart(4, '0')} ${adjPokemon.full_name}`}
      {direction === 'right' && (<ChevronRightIcon className="w-5 h-5" />)}
    </Link>
  )
}



export async function getStaticPaths() {
  // Fetch all names from database (only 100, this may be less efficient for larger database)
  const data = await prisma.pokemon.findMany({
    select: {
      name: true,
    }
  });
  // Modify data for return statement
  const names = data.map(pokemon => {
    return { params: { name: pokemon.name } }
  });

  return {
    paths: [
      ...names
    ],
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const name = String(context.params?.name);

  const pokemon = await fetchPokemonByName(name);

  return {
    props: {
      pokemon,
    },
  };
}