// import React, { FC } from "react";
// import UserList from "@/components/UserList/UserList";
// import styled from "styled-components";
// import WebPageList from "@/components/WebPage";

// interface pageWebprops {
//   isOpen: boolean;
// }

// const StylePageWeb = styled.div<{ $isOpen: boolean }>`
//   transition: margin-left 0.3s ease;
//   margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
// `;

// const pageWeb: FC<pageWebprops> = ({ isOpen }) => {
//   return (
//     <StylePageWeb $isOpen={isOpen}>
//       <WebPageList />
//     </StylePageWeb>
//   );
// };
// export default pageWeb;

// pages/page-web.tsx
import React, { FC } from "react";
import WebPageList from "@/components/WebPage";
import styled from "styled-components";
import { withAuth } from "@/utils/auth";

const StylePageWeb = styled.div``;

const PageWeb: FC = () => {
  return (
    <StylePageWeb>
      <WebPageList />
    </StylePageWeb>
  );
};
export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      isOpen: true,
    },
  };
});

export default PageWeb;
