import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 30px 50px;
  flex-direction: column;
  margin-bottom: 50px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 60px;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  input {
    margin: 20px;
    width: 30%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
  }
  input[type="submit"] {
    background-color: turquoise;
    font-size: large;
    border: 1px solid lightblue;
    border-radius: 8px;
    width: 20%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  input[type="submit"]:hover {
    background-color: #40e0d0;
  }
`;

const ProductFormContainer = styled.div`
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  input {
    text-align: center;
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
  }
  span {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
  }
  button,
  input[type="submit"] {
    background-color: turquoise;
    font-size: large;
    border: 1px solid lightblue;
    border-radius: 8px;
    width: 45%;
    height: 45%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover,
  input[type="submit"]:hover {
    background-color: #40e0d0;
  }
`;

const Button = styled.button`
  background-color: turquoise;
  font-size: large;
  border: 1px solid lightblue;
  border-radius: 8px;
  width: 40%;
  margin: 10px;
  height: 0%;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  color: black;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #40e0d0;
  }
`;

export { Container, FormContainer, ProductFormContainer, Button };
