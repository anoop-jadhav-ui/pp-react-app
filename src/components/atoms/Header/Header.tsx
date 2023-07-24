import { Typography } from "@mui/material";
import styles from "./Header.module.css";

function Header() {
  return (
    <Typography variant="h3" component="h1" textAlign="center">
      <div className={styles.logo}>
        <img src="/src/assets/logo/logo-colored.svg" alt="logo" width="300px" />
      </div>
    </Typography>
  );
}

export default Header;
