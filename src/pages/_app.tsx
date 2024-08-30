import { AppProps } from "next/app";
import { useRouter } from "next/router";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/styles";
import Layout from "@/Layout/Layout";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const noLayoutRoutes = ["/login"];
  // const protectedRoutes = ["/pageUsers", "/pageWeb", "/pageUsers"];
  const protectedRoutes = ["/pages"];

  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);

      if (protectedRoutes.includes(router.pathname)) {
        router.push("/dashboard");
      }
    }
  }, []);

  if (!isAuthenticated && protectedRoutes.includes(router.pathname)) {
    return null;
  }

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
