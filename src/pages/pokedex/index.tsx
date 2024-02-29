import type { GetServerSidePropsContext } from "next";
import type { PokemonBasic } from "@/lib/types/pokemon";

import Link from "next/link";

import Pagination from "@/lib/ui/components/pagination";
import PokemonCard from "@/lib/ui/components/pokemon-card";
import Search from "@/lib/ui/components/search";

import { fetchPokemonList, countPokemonPages } from "@/lib/db/pokemon";


export default function Pokedex({
  pokemonList,
  totalPages,
}: {
  pokemonList: PokemonBasic[];
  totalPages: number,
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Search placeholder="Search Pokemon..." />
      {pokemonList.map((pokemon) => {
        return (
          <Link key={pokemon.id} href={`/pokedex/${pokemon.name}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        );
      })}
      <Pagination totalPages={totalPages} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const page = Number(query.page) || 1;
  const search = query.search ? String(query.search) : "";
  
  const pokemonList = await fetchPokemonList(page, search);
  const totalPages = await countPokemonPages(search);

  return {
    props: {
      pokemonList,
      totalPages,
    },
  };
}
