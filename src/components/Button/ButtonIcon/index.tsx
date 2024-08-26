"use client";
import React from "react";
import styled from "styled-components";

interface ButtonIconProps {
  icon: React.ReactNode;
}

const StyledButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon }) => {
  return <StyledButtonIcon>{icon}</StyledButtonIcon>;
};

export default ButtonIcon;
