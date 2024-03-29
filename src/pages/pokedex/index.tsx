import type { GetServerSidePropsContext } from "next";
import type { CardData } from "@/lib/types/pokemon";

import Link from "next/link";

import Pagination from "@/lib/ui/components/pagination";
import PokemonCard from "@/lib/ui/components/pokemon-card";
import Search from "@/lib/ui/components/search";

import { fetchPokemonList, countPokemonPages } from "@/lib/db/pokemon";


export default function Pokedex({
  pokemonList,
  totalPages,
}: {
  pokemonList: CardData[];
  totalPages: number,
}) {
  return (
    <div className="flex flex-col justify-center gap-3">
      <Search placeholder="Search Pokemon..." />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {pokemonList.map((pokemon) => {
          return (
            <Link key={pokemon.id} href={`/pokedex/${pokemon.name}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          );
        })}
      </div>
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
