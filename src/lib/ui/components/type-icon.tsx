import Link from "next/link"

import clsx from "clsx";


export default function TypeIcon({ name, shortened } : { name: string, shortened?: boolean }) {
  const iconStyle = clsx(
    `${name} flex justify-center items-center rounded border border-gray-300`,
    {
      "w-20 h-8" : !shortened,
      "w-8 h-8 md:w-10 md:h-10" : shortened,
    }
  );

  return (
    <Link href={`/types/${name}`} className="hover:brightness-90">
      <div className={iconStyle}>
        <span className="text-xs md:text-sm text-white font-semibold text-shadow">
          {shortened ? name.slice(0, 3).toUpperCase() : name.toUpperCase()}
        </span>
      </div>
    </Link>
  )
}