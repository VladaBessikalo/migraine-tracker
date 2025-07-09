import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../store/slices/authSlice";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      setLocalError("");

      const userCredential = isRegistering
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (err: any) {
      setLocalError(err.message);
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      setLocalError("");

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (err: any) {
      setLocalError(err.message);
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      spacing={2}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isRegistering ? "Sign Up" : "Login"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {localError && <Typography color="error">{localError}</Typography>}

          <Button variant="contained" onClick={handleAuth} fullWidth>
            {isRegistering ? "Sign Up" : "Login"}
          </Button>

          <Button onClick={() => setIsRegistering((prev) => !prev)} fullWidth>
            {isRegistering
              ? "Already have an account? Login"
              : "New user? Sign Up"}
          </Button>

          <Divider>or</Divider>

          <Button onClick={handleGoogleSignIn} variant="outlined" fullWidth>
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AuthPage;
