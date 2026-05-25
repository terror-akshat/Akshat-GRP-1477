import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    theme: "dark",
    draggable: true,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Username and password are required", toastOptions);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long", toastOptions);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return;
    }

    try {
      const result = await register(formData.username, formData.password);

      if (result.success) {
        toast.success("Account created. You can sign in now.", toastOptions);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration failed. Please try again.",
        toastOptions
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6da7ec",
          px: 2,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "#000",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <PersonAddAlt1Icon />
            </Box>

            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Self-registration creates a standard user account.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link
                  component="button"
                  type="button"
                  underline="hover"
                  onClick={() => navigate("/")}
                >
                  Back to sign in
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Register;
