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

/**
 * Generate an array of numbers used as the base for the pagination component
 * @param currentPage The current active page number
 * @param totalPages The total number of pages
 */
export function generatePagination(currentPage: number, totalPages: number): number[] {
   // If the total number of pages is less than or equal to 5, display all the page numbers
   if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  // If the current page is less than or equal to 3, display the first 5 pages
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 6, 7];
  }

  // If the current page is greater than or equal to totalPages-4, display the last 7 pages
  if (currentPage >= totalPages-4) {
    return Array.from({ length: 7 }, (_, i) => (i+1) + totalPages-7) // Adding i+1 because pages start from 1, not 0
  }

  // Else, return the page and its two adjacent pages on both sides
  return [ currentPage-3, currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2, currentPage+3 ];
}