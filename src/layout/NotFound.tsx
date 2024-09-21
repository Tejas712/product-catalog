import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/");
  }, [navigate]);

  return (
    <Box display={"flex"} justifyContent={"center"}>
      NotFound
    </Box>
  );
};

export default NotFound;
