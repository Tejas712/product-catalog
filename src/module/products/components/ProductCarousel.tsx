import { Box, Card, CardMedia, Grid } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import Thumbnails from "../../../components/carousel/Thumbnails";

type Props = {
  images: string[] | string;
};

const ProductCarousel: FC<Props> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const changeCurrentIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const [selectedImg, setSelectedImg] = useState<string>(
    "https://via.placeholder.com/600x400"
  );

  useEffect(() => {
    if (!Array.isArray(images)) {
      setCurrentIndex(-1);
    } else if (images.length) {
      setCurrentIndex(0);
    }
  }, [images]);

  return (
    <Grid display={{ sm: "block", md: "flex" }} sx={{ flexDirection: "row" }}>
      <Grid item xs={12} md={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", md: "column" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            pt: 2,
          }}
        >
          {Array.isArray(images) && (
            <Thumbnails
              images={images}
              selectedIndex={currentIndex}
              onClick={changeCurrentIndex}
            />
          )}
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        display={{ sm: "block", md: "flex" }}
        alignItems={"center"}
        p={1}
      >
        <Box sx={{ position: "relative" }}>
          <Card
            sx={{
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardMedia
              component="img"
              image={Array.isArray(images) ? images[currentIndex] : images}
              alt="Main Product"
              sx={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductCarousel;
