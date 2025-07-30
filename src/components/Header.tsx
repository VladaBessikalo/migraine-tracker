import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import type { RootState } from "../store/store";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

  return (
    <AppBar sx={{ backgroundColor: "#328e6e" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Migraine Tracker
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Typography variant="body1">
                Welcome, {user.displayName || user.email}
              </Typography>
              <Button
                color="inherit"
                onClick={logout}
                variant="outlined"
                size="small"
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="body1">Please log in</Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
