// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { TextField, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
 
 const LoginPage: React.FC = () => {
   const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
   const handleLogin = () => {
    if ( password === "password") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      style={{ maxWidth: "300px", margin: "100px auto", textAlign: "center" }}
    >
      <h1>Login</h1>
       
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e, newValue) => setPassword(newValue || "")}
      />
      <PrimaryButton text="Login" onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;
