import type { GetStaticPathsContext, GetStaticPropsContext } from "next";
import type { Type } from "@prisma/client";
import type { TypeWithRelations } from "@/lib/types/type";

import prisma from "@/lib/db/prisma";
import { Fragment } from "react";
import clsx from "clsx";

import NotFound from "@/pages/404";
import TypeIcon from "@/lib/ui/components/type-icon";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";

import { fetchTypeNames } from "@/lib/db/type";
import { capitalizeEach } from "@/lib/utils";

export default function TypeEntry({
  type,
}: {
  type: TypeWithRelations | null;
}) {
  if (!type) {
    return <NotFound />;
  }

  const capitalizedTypeName = capitalizeEach(type.name);
  return (
    <div>
      <h1 className="pb-3 text-3xl text-center font-semibold">
        {capitalizedTypeName} <span className="text-gray-500">(type)</span>
      </h1>
      <div className="pt-4">
        <h2 className="font-semibold">
          Attack <span className="text-gray-500">pros & cons</span>
        </h2>
        {type.double_damage_to.length > 0 && (
          <TypeEffectiveness direction="attack" relation="double" types={type.double_damage_to} name={capitalizedTypeName} />
        )}
        {type.half_damage_to.length > 0 && (
          <TypeEffectiveness direction="attack" relation="half" types={type.half_damage_to} name={capitalizedTypeName} />
        )}
        {type.no_damage_to.length > 0 && (
          <TypeEffectiveness direction="attack" relation="no" types={type.no_damage_to} name={capitalizedTypeName} />
        )}
      </div>
      <div className="pt-4">
        <h2 className="font-semibold">
          Defense <span className="text-gray-500">pros & cons</span>
        </h2>
        {type.no_damage_from.length > 0 && (
          <TypeEffectiveness direction="defense" relation="no" types={type.no_damage_from} name={capitalizedTypeName} />
        )}
        {type.half_damage_from.length > 0 && (
          <TypeEffectiveness direction="defense" relation="half" types={type.half_damage_from} name={capitalizedTypeName} />
        )}
        {type.double_damage_from.length > 0 && (
          <TypeEffectiveness direction="defense" relation="double" types={type.double_damage_from} name={capitalizedTypeName} />
        )}
      </div>
    </div>
  );
}

type Relation = "double" | "half" | "no";
type Direction = "attack" | "defense";
function TypeEffectiveness({
  name,
  direction,
  relation,
  types,
}: {
  name: string;
  direction: Direction;
  relation: Relation;
  types: Type[];
}) {
  const goodForAttack = direction === 'attack' && relation === 'double';
  const goodForDefense = direction === 'defense' && relation !== 'double';
  const symbolIcon =
    goodForAttack || goodForDefense ? (
      <CheckCircleIcon className="inline mr-3 w-5 h-5 text-green-500" />
    ) : (
      <XCircleIcon className="inline mr-3 w-5 h-5 text-red-500" />
    );

  const effectivenessText = clsx({
    "is super-effective against:":                  direction === 'attack' && relation === "double",
    "is not very effective against:":               direction === 'attack' && relation === "half",
    "has no effect against:":                       direction === 'attack' && relation === "no",
    "These types are super effective against" :     direction === 'defense' && relation === 'double',
    "These types are not very effective against" :  direction === 'defense' && relation === 'half',
    "These types have no effect against" :          direction === 'defense' && relation === 'no',
  });

  return (
    <section className="p-2">
      <p>
        {symbolIcon}
        {direction === 'attack' ? 
          (<><span className="italic">{name}</span> {effectivenessText}</>) :
          (<>{effectivenessText} <span className="italic">{name}</span></>)
        }
      </p>
      <TypeList types={types} />
    </section>
  );
}

function TypeList({ types }: { types: Type[] }) {
  return (
    <div className="flex flex-wrap gap-1 pl-7 py-4">
      {types.map((type) => {
        return (
          <Fragment key={type.id}>
            <TypeIcon name={type.name} link={true} />
          </Fragment>
        );
      })}
    </div>
  );
}


export async function getStaticPaths(context: GetStaticPathsContext) {
  type Data = {
    typeList: string[];
  };

  const data: string[] = await fetchTypeNames();

  const types = data.map((type) => {
    return { params: { name: type } };
  });

  return {
    paths: [...types],
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const name = String(context.params?.name);

  const type = await prisma.type.findFirst({
    where: {
      name,
    },
    include: {
      double_damage_from: true,
      double_damage_to: true,
      half_damage_from: true,
      half_damage_to: true,
      no_damage_from: true,
      no_damage_to: true,
    },
  });

  return {
    props: {
      type,
    },
  };
}
