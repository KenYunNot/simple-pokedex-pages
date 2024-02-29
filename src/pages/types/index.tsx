import type { GetStaticPropsContext } from "next";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { fetchTypeNames } from "@/lib/db/type";

type TypeIcon = {
  name: string,
  link: string,
}

export default function Types({ typeIcons } : { typeIcons: TypeIcon[] }) {

  return (
    <div className="grid grid-cols-2 justify-items-center w-fit mx-[auto] gap-5 md:grid-cols-3">
      {typeIcons.map(icon => {
        return (
          <Link key={icon.name} href={`/types/${icon.name}`}>
            <RoundTypeIcon name={icon.name} link={icon.link} />
          </Link>
        )
      })}
    </div>
  )
}

function RoundTypeIcon({ name, link } : { name: string, link: string }) {
  const iconStyle = clsx(
    "p-4 rounded-full duration-150 opacity-50 hover:opacity-100", 
    {
      "bg-bug" : name === 'bug',
      "bg-dark" : name === 'dark',
      "bg-dragon" : name === 'dragon',
      "bg-electric" : name === 'electric',
      "bg-fairy" : name === 'fairy',
      "bg-fighting" : name === 'fighting',
      "bg-fire" : name === 'fire',
      "bg-flying" : name === 'flying',
      "bg-ghost" : name === 'ghost',
      "bg-grass" : name === 'grass',
      "bg-ground" : name === 'ground',
      "bg-ice" : name === 'ice',
      "bg-normal" : name === 'normal',
      "bg-poison" : name === 'poison',
      "bg-psychic" : name === 'psychic',
      "bg-rock" : name === 'rock',
      "bg-steel" : name === 'steel',
      "bg-water" : name === 'water',
    }
  );

  return (
    <Image 
      src={link}
      width={100}
      height={100}
      className={iconStyle}
      alt={`${name} type icon`}
    />
  )
}


export async function getStaticProps(context: GetStaticPropsContext) {
  const typeNames = await fetchTypeNames();

  const typeIcons = typeNames.map(name => {
    return {
      name,
      link: `${name}.svg`,
    }
  });

  return {
    props: {
      typeIcons,
    }
  }
}