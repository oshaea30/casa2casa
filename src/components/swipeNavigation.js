import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { FaUndo, FaTimes, FaHeart, FaStar } from "react-icons/fa";

const SwipeNavigation = ({
  handleBack,
  handleNext,
  handleFavorite,
  viewedHomes,
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap={4}
      py={4}
      height="80px"
    >
      <IconButton
        icon={<FaUndo />}
        colorScheme="yellow"
        aria-label="Undo"
        size="lg"
        isRound
        onClick={handleBack}
        isDisabled={viewedHomes.length === 0}
      />
      <IconButton
        icon={<FaTimes />}
        colorScheme="red"
        aria-label="Dislike"
        size="lg"
        onClick={handleNext}
        isRound
      />
      <IconButton
        icon={<FaHeart />}
        colorScheme="green"
        aria-label="Like"
        size="lg"
        onClick={handleNext}
        isRound
      />
      <IconButton
        icon={<FaStar />}
        colorScheme="blue"
        aria-label="Favorite"
        size="lg"
        onClick={handleFavorite}
        isRound
      />
    </Flex>
  );
};

export default SwipeNavigation;
