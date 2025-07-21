import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { API_ROUTES } from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCookies } from "../../utils/setCookies";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_ROUTES.AUTH.LOGIN,
        { email, password },
        { withCredentials: true }
      );
      setCookies("authToken", response.data.data.token);
      toast.success("logined In");
      navigate("/");
    } catch (error) {
      toast.error("failed to login");
    } finally {
      setEmail("");
      setPassword("");
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
        Login
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
