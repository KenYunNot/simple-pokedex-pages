import type { AppProps } from "next/app";

import NavLayout from "@/lib/ui/layouts/nav-layout";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavLayout>
      <Component {...pageProps} />
    </NavLayout>
  );
}
