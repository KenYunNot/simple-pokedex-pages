import Navbar from "../components/navbar"

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NavLayout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={`m-[auto] p-3 max-w-7xl ${inter.className}`}>{children}</main>
    </>
  )
}