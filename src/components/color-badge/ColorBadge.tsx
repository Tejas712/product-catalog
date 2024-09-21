import { Box } from "@mui/material";
import { FC } from "react";

type Props = {
  color: string;
  onClick?: () => void;
  selected?: boolean;
};
const ColorBadge: FC<Props> = ({ color, selected, onClick }) => {
  return (
    <Box
      component="div"
      sx={{
        width: 32,
        height: 32,
        backgroundColor: color,
        borderRadius: "50%",
        border: "2px solid ",
        borderColor: selected ? "darkgray" : '#fff',
      }}
      onClick={onClick}
    />
  );
};

export default ColorBadge;
