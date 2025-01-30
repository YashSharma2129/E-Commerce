import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import AuthContext from "../store/auth-context";
import { LoginConstant } from "../store/constant";
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled(motion.form)`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 25px;

  input {
    width: 100%;
    padding: 12px 45px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s;
    background: transparent;

    &:focus {
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      outline: none;
    }
  }

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #95a5a6;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;

const LinkText = styled(Link)`
  color: #3498db;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
`;

export default function SigninUser() {
  const [data, setData] = useState(LoginConstant);
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.email || !data.secret) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await Axios.post("/api/signin", {
        email: data.email,
        secret: data.secret,
      });

      if (response.data === "NO") {
        setError("Invalid email or password");
      } else {
        auth.login(response.data.accessToken, 500, response.data.id);
        window.location = "/";
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.id]: e.target.value });
  };

  return (
    <PageContainer>
      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Welcome Back</Title>
        <InputGroup>
          <FaEnvelope />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup>
          <FaLock />
          <input
            type="password"
            id="secret"
            placeholder="Enter your password"
            value={data.secret}
            onChange={handleChange}
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sign In
        </Button>
        <LinkText to="/signup">
          <FaUserPlus />
          Do not have an account? Sign Up
        </LinkText>
        <LinkText to="/">Back to Home</LinkText>
      </FormContainer>
    </PageContainer>
  );
}
