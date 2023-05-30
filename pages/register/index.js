import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { Typography } from "@mui/material";

//API imports
import usersApi from "../../pages/api/users";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [pageVisibility, setPageVisibility] = useState(false);

  useEffect(() => {
    const currentUser = usersApi.getCurrentUser();
    if (currentUser) {
      router.replace("/admin");
    } else {
      setPageVisibility(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { username: username, password: password };
      const response = await usersApi.create(data);
      if (response.status == 400) {
        setStatus(response.data);
        return;
      }
      usersApi.loginWithJwt(response.result.token);
      router.replace("/admin");
    } catch (error) {
      console.log("error --- ", response);
    }
  };

  const handleUsername = (event) => {
    const inputValue = event.target.value;
    setUsername(inputValue);
  };

  const handlePassword = (event) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
  };

  return (
    pageVisibility && (
      <Box sx={{ maxWidth: 500, height: "100vh", margin: "0 auto" }}>
        <Typography sx={{ fontWeight: 900 }}>Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ mt: "10px", mb: "10px" }}
            type="text"
            variant="outlined"
            color="secondary"
            label="Username"
            onChange={handleUsername}
            value={username}
            fullWidth
            required
          />
          <TextField
            sx={{ mt: "10px", mb: "10px" }}
            type="password"
            variant="outlined"
            color="secondary"
            label="Password"
            onChange={handlePassword}
            value={password}
            fullWidth
            required
          />
          {status && <Alert severity="error">{status}</Alert>}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Button variant="contained">CANCEL</Button>
            <Button variant="contained" type="submit">
              SUBMIT
            </Button>
          </Box>
        </form>
      </Box>
    )
  );
};

export default Register;
