import Navbar from "../components/navbar"

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NavLayout({ children } : { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={`${inter.className}`}>{children}</main>
    </>
  )
}