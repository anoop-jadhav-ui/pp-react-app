import { Stack, Typography } from "@mui/material";

function Footer() {
  return (
    <Stack alignItems="center" sx={{ mb: 4 }}>
      <Typography textAlign="center" variant="caption">
        This project is still work in development. There is some default data
        added, feel free to clear it and new members. The added data is not
        stored anywhere as of now.
      </Typography>
    </Stack>
  );
}

export default Footer;
