// utils/auth.ts
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export const withAuth = (getServerSidePropsFunc?: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const { authToken: token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    // Se existir outra função getServerSideProps, execute-a
    if (getServerSidePropsFunc) {
      return await getServerSidePropsFunc(ctx);
    }

    // Caso contrário, apenas retorne props básicas
    return {
      props: {},
    };
  };
};
