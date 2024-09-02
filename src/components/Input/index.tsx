import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import styled from "styled-components";

interface InputComponentProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  width?: string;
  height?: string;
  required?: boolean;
}

const InputContainer = styled.div<{ width?: string; height?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const StyledInput = styled.input<{ height?: string }>`
  padding: 0.5rem;
  font-size: 1rem;
  height: ${({ height }) => height || "auto"};
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const StyledSelect = styled.select<{ height?: string }>`
  padding: 0.5rem;
  font-size: 1rem;
  height: ${({ height }) => height || "auto"};
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const InputComponent: React.FC<InputComponentProps> = ({
  name,
  label,
  type = "text",
  options = [],
  placeholder,
  width,
  height,
  required = false,
}) => {
  const { control } = useFormContext(); // Usando o contexto do react-hook-form

  return (
    <InputContainer width={width} height={height}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) =>
          type === "select" ? (
            <StyledSelect
              {...field}
              id={name}
              height={height}
              required={required}
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StyledSelect>
          ) : (
            <StyledInput
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              height={height}
              required={required}
            />
          )
        }
      />
    </InputContainer>
  );
};

export default InputComponent;
