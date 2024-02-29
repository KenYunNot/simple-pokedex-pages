import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Bars3Icon } from "@heroicons/react/24/solid";


const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Pokédex",
    href: "/pokedex",
  },
  {
    name: "Types",
    href: "/types",
  },
];

export default function Navbar() {
  return (
    <>
      <FullNavbar className="hidden md:flex" />
      <MobileNavbar className="md:hidden" />
    </>
  )
}

function FullNavbar({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={`flex justify-evenly w-full px-3 bg-red-500 ${className}`}>
      <Link href="/">
        <Image
          src="/logo.png"
          width={300}
          height={167}
          alt="Simple Pokedex v3 logo"
          priority={true}
        />
      </Link>
      <ul className="flex justify-center items-center">
        {links.map((link) => {
          let isActive = link.href === pathname;
          return (
            <li key={link.href} className="w-24 h-full">
              <Link
                href={link.href}
                className={clsx(
                  "flex flex-col justify-center w-full h-full items-center bg-red-500 rounded-md text-lg text-white font-semibold",
                  {
                    "bg-yellow-400 pointer-events-none": isActive,
                    "hover:bg-red-400": !isActive,
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNavbar({ className="" } : { className: string }) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();

  const listStyle = clsx(
    "absolute top-14 left-0 w-full z-10", 
    {
      "hidden": !showNav,
      "block": showNav,
    }
  );

  return (
    <nav className={`flex justify-between items-center h-14 px-2 bg-red-500 ${className}`}>
      <Link href="/">
        <Image
          src="/logo.png"
          width={200}
          height={65}
          alt="Simple Pokedex v3 logo"
          priority={true}
        />
      </Link>
      <button onClick={() => setShowNav(!showNav)}>
        <Bars3Icon className="w-7 h-7 text-white" />
      </button>
      <ul className={listStyle}>
        {links.map((link) => {
          let isActive: boolean;
          if (link.href === "/") {
            isActive = pathname === link.href;
          } else {
            isActive = pathname.startsWith(link.href);
          }
          return (
            <li key={link.name} className="w-full h-14">
              <Link
                href={link.href}
                onClick={() => setShowNav(false)}
                className={clsx(
                  "flex justify-center items-center w-full h-full bg-red-500 text-xl text-white font-semibold",
                  {
                    "bg-yellow-400 pointer-events-none": isActive,
                    "hover:bg-red-400": !isActive,
                  }
                )}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}