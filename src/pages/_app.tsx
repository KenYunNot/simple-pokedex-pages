import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavLayout from "@/ui/layouts/nav-layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavLayout>
      <Component {...pageProps} />
    </NavLayout>
  );
}
