import type { Pokemon } from "@/lib/types/pokemon";
import { capitalize } from "@/lib/utils";

/**
 * Display a table containing basic data about the Pokemon
 */
export default function PokemonDataTable({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-3 bg-sky-400 rounded-md">
      <div>
        <h3 className="text-white font-semibold">Height</h3>
        <p className="text-xl">{(pokemon.height / 10).toFixed(1)} m</p>
      </div>
      <div>
        <h3 className="text-white font-semibold">Weight</h3>
        <p className="text-xl">{(pokemon.weight / 10).toFixed(1)} kg</p>
      </div>
      <div>
        <h3 className="text-white font-semibold">Genus</h3>
        <p className="text-xl">{pokemon.genus.split(" ")[0]}</p>
      </div>
      <div>
        <h3 className="text-white font-semibold">Abilities</h3>
        <p className="text-xl">{capitalize(pokemon.abilities[0])}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-white font-semibold">Gender</h3>
        <span className="flex flex-col gap-2 w-full pt-2">
          <div className="flex">
            <div
              className={`w-[${pokemon.gender_rate * 12.5}%] h-3 bg-pink-300`}
            />
            <div className="grow h-3 bg-blue-500" />
          </div>
          <p className="text-center">
            <span className="text-pink-600">
              {pokemon.gender_rate * 12.5}% &#9792;
            </span>
            {", "}
            <span className="text-blue-700">
              {100 - pokemon.gender_rate * 12.5}% &#9794;
            </span>
          </p>
        </span>
      </div>
    </div>
  );
}