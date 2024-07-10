import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import url from "../assets/login/image1.png";

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleLoginSuccess = (message) => {
    setSnackbarSeverity("success");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    navigate("/");
  };

  const handleLoginFailure = (message) => {
    setSnackbarSeverity("error");
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a valid Email Address.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      // alert("Please enter a valid Email Address.");
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a valid Email Address.");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter a password");
      setSnackbarOpen(true);
      setLoading(false);
    }

    const apiUrl = "http://localhost:3200/auth/login?by=local";
    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      handleLoginSuccess(response.data.message);
    } catch (error) {
      console.error("API error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleLoginFailure("Login failed: " + error.response.data.message);
      } else {
        handleLoginFailure("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={7} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              padding: "70px",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              LOGIN
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Login to access your Golobe Account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Remember me"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#8DD3BB" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={26} /> : "Login"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Don't have an account?{" "}
                  <Link href="/signup" variant="body2">
                    Signup
                  </Link>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  sx={{ marginTop: "10px" }}
                >
                  <Button component="a" href="http://localhost:3200/auth/login?by=google" target="_self" rel="noopener noreferrer">
                    <Box
                      sx={{
                        width: "150px",
                        height: "56px",
                        border: "1px solid #8DD3BB",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        display: "flex",
                      }}

                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "30px",
                          width: "30px",
                          overflow: "hidden",
                          marginLeft: "60px",
                        }}
                      >
                        <img src="src/assets/login/google.png" alt="google" />
                      </Box>
                    </Box>
                  </Button>
                  <Button component="a" href="http://localhost:3200/auth/login?by=facebook" target="_blank" rel="noopener noreferrer">
                    <Box
                      sx={{
                        width: "150px",
                        height: "56px",
                        border: "1px solid #8DD3BB",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "30px",
                          width: "30px",
                          overflow: "hidden",
                          marginLeft: "10px",
                        }}
                      >
                        <img src="src/assets/login/facebook.png" alt="facebook" />
                      </Box>
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={8}
          md={5}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "110px",
          }}
        >
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            style={{ height: "100%", width: "100%" }}
          >
            <div>
              <img
                src={url}
                alt="Slider 1"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10%",
                }}
              />
            </div>
            <div>
              <img
                src={url}
                alt="Slider 2"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src={url}
                alt="Slider 3"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </div>
          </Carousel>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Login;