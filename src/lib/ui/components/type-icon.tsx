import Link from "next/link"

import clsx from "clsx";


export default function TypeIcon({ name, shortened, link } : { name: string, shortened?: boolean, link?: boolean }) {
  const iconStyle = clsx(
    `${name} flex justify-center items-center rounded border border-black border-opacity-20 text-[11px] text-white font-semibold text-shadow\
      hover:brightness-90`,
    {
      "w-[72px] h-7" : !shortened,
      "w-7 h-7 md:w-10 md:h-10 md:text-sm" : shortened,
    }
  );

  if (!link) {
    return (
      <span className={iconStyle}>
        {shortened ? name.slice(0, 3).toUpperCase() : name.toUpperCase()}
      </span>
    )
  }

  return (
    <Link href={`/types/${name}`}>
      <span className={iconStyle}>
        {shortened ? name.slice(0, 3).toUpperCase() : name.toUpperCase()}
      </span>
    </Link>
  )
}