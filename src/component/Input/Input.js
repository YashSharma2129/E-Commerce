import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
`;

export default function Input(props) {
  const {
    label,
    type,
    id,
    min,
    step,
    value,
    placeholder,
    minlength,
    handleChange,
  } = props;

  return (
    <React.Fragment>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        min={min}
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
        minlength={minlength}
      />
    </React.Fragment>
  );
}
