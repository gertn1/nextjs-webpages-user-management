import React from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import ButtonText from "./ButtonText";

interface ButtonProps {
  text?: string;
  icon?: React.ReactNode;
  size?: string;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  padding?: string;
}

const StyledButton = styled.button<{
  size: string;
  color?: string;
  padding?: string;
  backgroundColor?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: ${({ padding }) => padding || "8px 5px"};
  color: ${({ color }) => color || "#fff"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#0070f3"};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  size = "14px",
  color,
  backgroundColor,
  onClick,
  padding,
}) => {
  return (
    <StyledButton
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {icon && <ButtonIcon icon={icon} />}
      <ButtonText text={text} />
    </StyledButton>
  );
};

export default Button;
