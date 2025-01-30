import React from "react";
import "./Spinner.css";
import styled from "styled-components";

const Container = styled.div`
  background: ${(props) => (props.overlay ? "rgba(0, 0, 0, 0.5)" : "transparent")};
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  text-align: center;
`;

const Message = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  color: ${(props) => props.color || "#000"};
`;

export default function Spinner({ overlay = true, color = "#000", message = "Loading..." }) {
  return (
    <Container overlay={overlay}>
      <ContentBox>
        <div
          className="ispinner gray animating ispinner-large"
          style={{ "--ispinner-color": color }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="ispinner-blade"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        {message && <Message color={color}>{message}</Message>}
      </ContentBox>
    </Container>
  );
}
