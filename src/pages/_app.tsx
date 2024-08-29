import { AppProps } from "next/app";
import { useRouter } from "next/router";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/styles";
import Layout from "@/components/Layout/Layout";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const noLayoutRoutes = ["/login"]; // Rotas que não devem usar o layout
  const protectedRoutes = ["/pageUsers", "/pageWeb"]; // Rotas que precisam de autenticação

  const isNoLayoutRoute = noLayoutRoutes.includes(router.pathname);

  useEffect(() => {
    const token = getCookie("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redireciona para a página de login se não estiver autenticado e tentar acessar uma rota protegida
      if (protectedRoutes.includes(router.pathname)) {
        router.push("/dashboard");
      }
    }
  }, []);

  // Se o usuário não estiver autenticado e estiver tentando acessar uma rota protegida, não renderiza o conteúdo
  if (!isAuthenticated && protectedRoutes.includes(router.pathname)) {
    return null; // Ou você pode renderizar uma tela de carregamento ou mensagem de acesso negado
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
