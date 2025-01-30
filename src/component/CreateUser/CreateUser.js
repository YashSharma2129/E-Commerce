import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import { FaSignInAlt } from 'react-icons/fa';

const StyledPaper = styled(Paper)`
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  border-radius: 20px;
  padding: 40px;
  margin-top: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-root {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    
    &:hover fieldset {
      border-color: #764ba2;
    }
    
    &.Mui-focused fieldset {
      border-color: #667eea;
    }
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 12px 40px;
  border-radius: 10px;
  text-transform: none;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;

const AvatarWrapper = styled(Avatar)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
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

export default function CreateUser() {
  const [data, setData] = useState({ fname: "", lname: "", email: "", secret: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const url = "/api/signup";
      const response = await Axios.post(url, data);
      if (response.data === "OK") {
        setSuccess(true);
        setData({ fname: "", lname: "", email: "", secret: "" });
      } else {
        setError("Email has already been signed up! Please retry.");
      }
    } catch (error) {
      setError("Something went wrong! Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledPaper elevation={0}>
          <FormContainer component="form" onSubmit={handleSubmit}>
            <AvatarWrapper>
              <PersonAdd sx={{ fontSize: 40 }} />
            </AvatarWrapper>

            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 3
            }}>
              Create Account
            </Typography>

            <StyledTextField
              label="First Name"
              name="fname"
              value={data.fname}
              onChange={handleChange}
              variant="outlined"
              required
            />

            <StyledTextField
              label="Last Name"
              name="lname"
              value={data.lname}
              onChange={handleChange}
              variant="outlined"
              required
            />

            <StyledTextField
              label="Email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              variant="outlined"
              required
            />

            <StyledTextField
              label="Password"
              name="secret"
              type="password"
              value={data.secret}
              onChange={handleChange}
              variant="outlined"
              required
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <SubmitButton
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create Account"
                )}
              </SubmitButton>
            </motion.div>

            <LinkText to="/signin">
              <FaSignInAlt />
              Already have an account? Sign In
            </LinkText>
            <LinkText to="/">Back to Home</LinkText>

            {success && (
              <Alert severity="success" sx={{ width: '100%', borderRadius: '10px' }}>
                Account created successfully!
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ width: '100%', borderRadius: '10px' }}>
                {error}
              </Alert>
            )}
          </FormContainer>
        </StyledPaper>
      </motion.div>
    </Container>
  );
}
