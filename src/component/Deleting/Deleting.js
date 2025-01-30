import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

export default function Deleting(props) {
  const { action, id } = props;

  return (
    <IconWrapper>
      <DeleteForeverIcon onClick={() => action(id)} />
    </IconWrapper>
  );
}
