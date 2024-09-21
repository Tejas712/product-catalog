import { Card, CardMedia } from "@mui/material";
import { FC } from "react";

type Props = {
  images: string[];
  selectedIndex?: number;
  onClick?: (index: number) => void;
};

const Thumbnails: FC<Props> = ({ images, selectedIndex, onClick }) => {
  return (
    <>
      {images.map((url, index) => (
        <Card
          key={index}
          sx={{
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            mb: 1,
          }}
        >
          <CardMedia
            component="img"
            image={url}
            alt={"Not Found"}
            sx={{
              width: 64,
              height: 64,
              objectFit: "cover",
              border: "2px solid",
              borderColor: selectedIndex === index ? "darkgray" : "#fff",
              borderRadius: "8px",
            }}
            onClick={() => onClick?.(index)}
          />
        </Card>
      ))}
    </>
  );
};


export default Thumbnails;