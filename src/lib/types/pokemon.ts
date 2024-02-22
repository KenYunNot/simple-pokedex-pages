import { Type } from "@prisma/client"

// In all use cases, if the fields are null the DexPointer itself will be represented as null.
// This is only to satisfy the Typescript conditions
export type DexPointer = {
  name: string | null,
  full_name: string | null,
};

export type PokemonBasic = {
  id: number,
  name: string,
  full_name: string,
  image_url: string,
  types: Type[],
}

export type Pokemon = {
  id: number,
  name: string,
  abilities: string[],
  image_url: string,
  height: number,
  weight: number,
  genus: string,
  flavor_texts: string[],
  gender_rate: number,
  left: DexPointer | null,
  right: DexPointer | null,
  is_default: boolean,
}