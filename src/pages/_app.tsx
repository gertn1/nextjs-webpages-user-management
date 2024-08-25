// import type { AppProps } from "next/app";
// import StyledComponentsRegistry from "./registry";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <StyledComponentsRegistry>
//       <Component {...pageProps} />
//     </StyledComponentsRegistry>
//   );
// }

import type { AppProps } from "next/app";
import StyledComponentsRegistry from "./registry";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "@/styles"; // Certifique-se de que o caminho está correto

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
