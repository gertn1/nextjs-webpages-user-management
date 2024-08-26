// "use client";
// import React from "react";
// import styled from "styled-components";

// interface ButtonTextProps {
//   text?: string;
// }

// const StyleButtonText = styled.button``;
// const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
//   return <StyleButtonText>{text}</StyleButtonText>;
// };

// export default ButtonText;

"use client";
import React from "react";
import styled from "styled-components";

interface ButtonTextProps {
  text?: string;
}

const StyledButtonText = styled.span`
  margin-left: 8px;
`;

const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
  return <StyledButtonText>{text}</StyledButtonText>;
};

export default ButtonText;
