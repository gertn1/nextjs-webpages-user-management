import type { AppProps } from "next/app";
import StyledComponentsRegistry from "./registry";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <Component {...pageProps} />
    </StyledComponentsRegistry>
  );
}
