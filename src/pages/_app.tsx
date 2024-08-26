// import type { AppProps } from "next/app";
// import StyledComponentsRegistry from "./registry";
// import { ThemeProvider } from "styled-components";
// import { GlobalStyles, theme } from "@/styles"; // Certifique-se de que o caminho está correto
// import Layout from "@/components/Layout/Layout";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <StyledComponentsRegistry>
//       <ThemeProvider theme={theme}>
//         <GlobalStyles />
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </ThemeProvider>
//     </StyledComponentsRegistry>
//   );
// }

import { AppProps } from "next/app";
import { useRouter } from "next/router";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/styles";
import Layout from "@/components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noLayoutRoutes = ["/login"];

  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {isNoLayoutRoute ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
    </StyleSheetManager>
  );
}

export default MyApp;
