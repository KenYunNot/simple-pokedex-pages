// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/db/prisma";

type Data = {
  typeList: string[],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const types = await prisma.type.findMany({
    select: {
      name: true,
    },
    orderBy: {
      id: "asc",
    }
  });

  const typeList = types.map(type => type.name)
  res.status(200).json({ typeList });
}
