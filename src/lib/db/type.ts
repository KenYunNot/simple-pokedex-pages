import prisma from "./prisma"

/**
 * Returns the list of all type names
 */
export async function fetchTypeNames(): Promise<string[]> {
  const types = await prisma.type.findMany({
    select: {
      name: true,
    }
  });

  return types.map(type => type.name);
}