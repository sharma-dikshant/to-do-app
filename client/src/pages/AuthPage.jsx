import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { Button, Box } from "@mui/material";

function AuthPage() {
  const [method, setMethod] = useState("login");

  const toggleMethod = () => {
    setMethod((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <Button variant="outlined" onClick={toggleMethod}>
        {method === "login"
          ? "Need an account? Sign Up"
          : "Already have an account? Login"}
      </Button>

      {method === "login" ? <Login /> : <SignUp />}
    </Box>
  );
}

export default AuthPage;
