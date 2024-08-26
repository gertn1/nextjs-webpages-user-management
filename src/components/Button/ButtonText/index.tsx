"use client";
import React from "react";
import styled from "styled-components";

interface ButtonTextProps {
  text?: string;
}

const StyledButtonText = styled.span``;

const ButtonText: React.FC<ButtonTextProps> = ({ text }) => {
  return <StyledButtonText>{text}</StyledButtonText>;
};

export default ButtonText;
