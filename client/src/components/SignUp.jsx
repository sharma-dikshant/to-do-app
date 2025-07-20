import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { API_ROUTES } from "../services/api";
import { useNavigate } from "react-router-dom";

const defaultForm = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.AUTH.SIGNUP, formData, {
        withCredentials: true,
      });
      toast.success("account created");
      navigate("/");
    } catch (error) {
      toast.error("failed to signup");
    } finally {
      setFormData(defaultForm);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
          fullWidth
          margin="normal"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default SignUp;
