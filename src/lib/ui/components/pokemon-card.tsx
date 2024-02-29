import Image from "next/image";
import { Fragment } from "react";

import { CardData } from "@/lib/types/pokemon";
import TypeIcon from "./type-icon";

export default function PokemonCard({ pokemon }: { pokemon: CardData }) {
  return (
    <div className="relative flex flex-col border-2 p-3 rounded-md">
      <h2 className="w-full text-xl font-semibold">{pokemon.full_name}</h2>
      <span className="absolute top-3 right-3 w-fit px-2 bg-red-500 rounded-full text-xl font-semibold text-white">
        {pokemon.id}
      </span>
      <Image
        src={pokemon.image_url}
        width={400}
        height={400}
        alt={`Image of Pokemon ${pokemon.id}`}
      />
      <span className="flex justify-center gap-1">
        {pokemon.types.map(type => {
          return (
            <Fragment key={type.id}>
              <TypeIcon name={type.name} />
            </Fragment>
          )
        })}
      </span>
    </div>
  );
}
