import { Box } from "@mui/material";

const Header = (props) => {
  return (
    <Box className="w-full" sx={{
      zIndex: 2,
      // width: "1000px",
      height: 60,
      bgcolor: "#2f2f2f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: props.borderBottom && "1px solid #2c2c2c",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px"
    }}>
      {props.children}
    </Box>
  );
};

export default Header;