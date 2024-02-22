import { Type } from "@prisma/client"

export type PokemonBasic = {
  id: number,
  name: string,
  full_name: string,
  image_url: string,
  types: Type[],
}