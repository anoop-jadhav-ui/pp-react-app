import { Typography } from "@mui/material";
import styles from "./Header.module.css";
import logo from "../../../assets/logo/logo-colored.svg";

function Header() {
  return (
    <Typography variant="h3" component="h1" textAlign="center">
      <div className={styles.logo}>
        <img src={logo} alt="logo" width="300px" />
      </div>
    </Typography>
  );
}

export default Header;
