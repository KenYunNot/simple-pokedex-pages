import type { GetStaticPropsContext } from "next";
import type { PokemonBasic } from "@/lib/types/pokemon";

import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import TypeIcon from "@/lib/ui/components/type-icon";

import { fetchTypeNames } from "@/lib/db/type";


export default function Home({
  firstTenPokemon,
  typeNames,
}: {
  firstTenPokemon: PokemonBasic[];
  typeNames: string[],
}) {
  return (
    <div className="py-3">
      <h1 className="w-full text-3xl font-bold text-center pb-3">
        Welcome to Simple Pokedex v3 on Pages!
      </h1>
      <section className="bg-gray-200 p-4 rounded-lg text-lg mt-3 mb-8">
        <p>
          Find out more about your favorite Pokemon and explore what makes them
          powerful!
        </p>
        <br />
        <p>
          This webpage was built with Next.js Pages Router, TypeScript, Tailwind
          CSS, and Prisma!
        </p>
        <br />
        <p>
          Link to my GitHub{" "}
          <Link
            href="https://github.com/KenYunNot"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            here
          </Link>
          !
        </p>
      </section>
      <h2 className="text-2xl font-bold pb-4">Quick Links!</h2>
      <section className="flex flex-col gap-6  max-w-xs">
        <ul className="grid grid-cols-1 gap-0.5 md:grid-cols-2">
          {firstTenPokemon.map((pokemon) => {
            return (
              <li key={pokemon.id} className="text-sm">
                <span className="text-gray-500">#{String(pokemon.id).padStart(4, '0')}</span>
                {" "}
                <Link
                  key={pokemon.name}
                  href={`/pokedex/${pokemon.name}`}
                  className="text-blue-500 hover:underline"
                >
                  {pokemon.full_name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap justify-center gap-[2px]">
          {typeNames.map(name => {
            return (
              <Fragment key={name}>
                <TypeIcon name={name} link={true} />
              </Fragment>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const firstTenPokemon = await prisma.pokemonSpecies.findMany({
    where: {
      id: {
        lte: 10,
      },
    },
    select: {
      id: true,
      name: true,
      full_name: true,
    },
    orderBy: {
      id: "asc",
    }
  });

  const typeNames = await fetchTypeNames();

  return {
    props: {
      firstTenPokemon,
      typeNames,
    },
  };
}
