import Image from "next/image";

import { PokemonBasic } from "@/lib/types/pokemon";

export default function PokemonCard({ pokemon } : { pokemon: PokemonBasic }) {
  return (
    <div className="flex flex-col justify-center">
      <h2>{pokemon.name}</h2>
      <Image
        src={pokemon.image_url}
        width={400}
        height={400}
        alt={`Image of Pokemon ${pokemon.id}`}
      />
    </div>
  )
}