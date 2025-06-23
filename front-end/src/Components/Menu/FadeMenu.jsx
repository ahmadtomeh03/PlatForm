import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSnackbar } from "../../Context/SnackbarContext";
import LockResetIcon from "@mui/icons-material/LockReset";

export default function FadeMenu() {
  const navigate = useNavigate();
  const { logout, username, role } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { showSnackbar } = useSnackbar();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    showSnackbar("You have been logged out successfully", "info");
    navigate("/home");
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };
  const handleChangePassword = () => {
    setAnchorEl(null);
    navigate("/change-password");
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          textTransform: "none",
          backgroundColor: "var(--color3)",
          color: "white",
          borderRadius: "20px",
          padding: "8px 16px",
        }}
      >
        <Avatar sx={{ width: 28, height: 28, marginRight: 1 }}>
          {username?.charAt(0).toUpperCase()}
        </Avatar>
        {username}
      </Button>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            minWidth: "220px",
            borderRadius: "12px",
            padding: "8px 0",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 36, height: 36, mr: 1.5 }}>
            {username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {username}
            </Typography>
            <Typography variant="caption" color="gray">
              {role} Account
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={handleProfile}>
          <AccountCircleIcon sx={{ fontSize: 20, mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleChangePassword}>
          <LockResetIcon sx={{ fontSize: 20, mr: 1 }} />
          Change Password
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ fontSize: 20, mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
