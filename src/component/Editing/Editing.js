import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function Editing(props) {
  const { action, id } = props;
  return (
    <IconWrapper>
      <EditIcon onClick={() => action(id)} />
    </IconWrapper>
  );
}
