import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="w-full bg-red-500">
      <Image 
        src='/logo.png'
        width={300}
        height={75}
        alt="Simple Pokedex logo"
      />
    </nav>
  )
}