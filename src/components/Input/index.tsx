import React from "react";
import styled from "styled-components";

interface InputProps {
  size?: "small" | "medium" | "large";
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const StyledInput = styled.input<InputProps>`
  padding: ${(props) =>
    props.size === "small"
      ? "4px 8px"
      : props.size === "medium"
      ? "8px 16px"
      : "12px 24px"};
  font-size: ${(props) =>
    props.size === "small"
      ? "12px"
      : props.size === "medium"
      ? "16px"
      : "20px"};
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Input: React.FC<InputProps> = ({
  size = "medium",
  type = "text",
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <StyledInput
      size={size}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
