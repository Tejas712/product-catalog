import { Box, Card, CardMedia, Grid } from "@mui/material";
import { FC, useEffect } from "react";
import useCarousel from "../../hooks/useCarousel";
import Thumbnails from "./Thumbnails";

type Props = {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onClick?: (index: number) => void;
};

const Carousel: FC<Props> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
  onClick,
}) => {
  const { currentIndex, changeCurrentIndex, startAutoPlay } = useCarousel({
    images,
    autoPlay,
    autoPlayInterval,
  });

  useEffect(() => {
    const stopAutoPlay = startAutoPlay();
    return () => stopAutoPlay && stopAutoPlay();
  }, [startAutoPlay]);

  if (!images.length) {
    return null;
  }

  return (
    <>
      <Grid>
        <Grid
          item
          md={12}
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
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
                image={images[currentIndex]}
                alt="Main Product"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  maxHeight: 500,
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
                onClick={() => onClick?.(currentIndex)}
              />
            </Card>
          </Box>
        </Grid>

        <Grid item md={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              pt: 2,
            }}
          >
            <Thumbnails
              images={images}
              selectedIndex={currentIndex}
              onClick={changeCurrentIndex}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Carousel;
