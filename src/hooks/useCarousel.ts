import { useState, useCallback } from "react";

type Props = {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
};
const useCarousel = ({
  images,
  autoPlay = true,
  autoPlayInterval = 10000,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const changeCurrentIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex > images.length - 1) {
            return 0;
          } else {
            return nextIndex;
          }
        });
      }, autoPlayInterval);

      return () => clearInterval(intervalId);
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  return {
    startAutoPlay,
    currentIndex,
    changeCurrentIndex,
  };
};

export default useCarousel;
