import { useCallback, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setLoading, setError } from "../store/slices/authSlice";
import { useAuth } from "../hooks/useAuth";
import type { RootState } from "../store";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const handleAuth = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      dispatch(setError("Email and password are required"));
      return;
    }
    
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const userCredential = isRegistering
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      console.log("user", user)

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      
      navigate("/");
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, email, password, isRegistering, navigate]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

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
      
      navigate("/");
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, navigate]);

  const handleToggleMode = useCallback(() => {
    setIsRegistering((prev) => !prev);
    dispatch(setError(null));
  }, [dispatch]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  if (user) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        height="100vh"
        spacing={2}
      >
        <Paper elevation={3} sx={{ padding: 4, width: 320 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" mb={2}>
            You're logged in as {user.email}
          </Typography>
          
          <Stack spacing={2}>
            <Button 
              variant="contained" 
              onClick={() => navigate("/")}
              fullWidth
            >
              Go to Home
            </Button>
            <Button 
              variant="outlined" 
              onClick={logout}
              fullWidth
            >
              Switch Account
            </Button>
          </Stack>
        </Paper>
      </Stack>
    );
  }

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
            onChange={handleEmailChange}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            disabled={loading}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}

          <Button 
            variant="contained" 
            onClick={handleAuth} 
            disabled={loading || !email.trim() || !password.trim()}
            fullWidth
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) :
              isRegistering ? "Sign Up" : "Login"}
          </Button>

          <Button 
            onClick={handleToggleMode} 
            disabled={loading} 
            fullWidth>
            {isRegistering
              ? "Already have an account? Login"
              : "New user? Sign Up"}
          </Button>

          <Divider>or</Divider>

          <Button 
            onClick={handleGoogleSignIn}
            variant="outlined" 
            disabled={loading}
            fullWidth>
                  Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AuthPage;
