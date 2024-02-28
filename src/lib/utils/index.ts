import type { TypeWithRelations } from "../types/type";


/**
 * Capitalizes all words in the given string. Separate the string into words using an optional delimiter (default is space)
 * @param s The string of words to capitalize
 * @param delimiter The delimiting character
 */
export function capitalizeEach(s: string, delimiter=" "): string {
  const tokens = s.split(delimiter);
  let result = "";
  for (let token of tokens) {
    result += " " + token.slice(0, 1).toUpperCase() + token.slice(1);
  }
  return result.slice(1);
}

/**
 * Returns the defensive multiplier against every Pokemon type on the combination of the given types
 * @param types The list of the given types with their damage multipliers (offensive and defensive)
 */
export function getTypeDefenses(types: TypeWithRelations[]): { [key: string] : number } {
  let typeDefenses = {} as { [key: string] : number }

  /* Helper function */
  const applyMultiplier = (name: string, multiplier: number) => {
    if (name in typeDefenses) typeDefenses[name] *= multiplier;
    else typeDefenses[name] = multiplier;
  }

  /* Parse all defensive damage relations */
  for (let type of types) {
    for (let ddf of type.double_damage_from) {
      applyMultiplier(ddf.name, 2);
    }

    for (let hdf of type.half_damage_from) {
      applyMultiplier(hdf.name, 0.5);
    }

    for (let ndf of type.no_damage_from) {
      applyMultiplier(ndf.name, 0);
    }
  }
  
  return typeDefenses;
}