import React, { FC } from "react";
import styled from "styled-components";
import ContentList from "@/components/WebPageCard";

const StylePageWeb = styled.div`
  padding: 20px;
`;

const WebPagesCard: FC = () => {
  return (
    <StylePageWeb>
      <ContentList />
    </StylePageWeb>
  );
};

export default WebPagesCard;
