import Link from "next/link";
import { GetServerSidePropsContext } from "next";

import { fetchPokemonList } from "@/lib/db/pokemon";

import PokemonCard from "@/lib/ui/components/pokemon-card";
import { PokemonBasic } from "@/lib/types/pokemon";

export default function Pokedex({
  pokemonList,
}: {
  pokemonList: PokemonBasic[];
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {pokemonList.map((pokemon) => {
        return (
          <Link href={`/pokedex/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const page = Number(query.page) || 1;
  const search = query.search ? String(query.search) : "";
  
  const pokemonList = await fetchPokemonList(page, search);

  return {
    props: {
      pokemonList,
    },
  };
}
