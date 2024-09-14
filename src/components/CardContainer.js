import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Link,
  CircularProgress,
  Image,
} from "@chakra-ui/react";
import { useSwipeable } from "react-swipeable";
import { Link as RouterLink } from "react-router-dom";
import {
  FaFilter,
  FaHeart,
  FaTimes,
  FaArrowLeft,
  FaStar,
  FaBell,
  FaSlidersH,
} from "react-icons/fa";
import HomeCard from "./HomeCard";
import axios from "axios";

const CardContainer = () => {
  const [homes, setHomes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewedHomes, setViewedHomes] = useState([]); // Tracks viewed homes
  const [favorites, setFavorites] = useState([]); // Tracks favorite homes

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/homes")
      .then((response) => {
        setHomes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the homes!", error);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    setViewedHomes([...viewedHomes, homes[index]]); // Add current home to viewed list
    setIndex((prevIndex) => (prevIndex + 1) % homes.length); // Move to next home
  };

  const handleBack = () => {
    if (viewedHomes.length > 0) {
      const lastViewedHome = viewedHomes.pop();
      setViewedHomes([...viewedHomes]);
      setIndex(homes.indexOf(lastViewedHome));
    }
  };

  const handleFavorite = () => {
    setFavorites([...favorites, homes[index]]); // Add current home to favorites
    handleNext(); // Move to next home after adding to favorites
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handleNext(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 10, // Lower delta value to make swipe more sensitive
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box height="100vh" overflow="hidden" position="relative">
      <Flex
        bg="white"
        height="10%"
        alignItems="center"
        justifyContent="space-between"
        px={4}
      >
        <Link as={RouterLink} to="/" fontWeight="bold">
          <Image
            src="/2CasaLogo.png"
            alt="2Casa Logo"
            boxSize="100px"
            objectFit="contain"
          />
        </Link>

        <Flex gap={2}>
          <IconButton
            icon={<FaBell />}
            variant="ghost"
            aria-label="Notifications"
          />
          <IconButton
            icon={<FaSlidersH />}
            variant="ghost"
            aria-label="Filter"
          />
        </Flex>
      </Flex>
      <Box
        {...handlers}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70%"
      >
        {homes.length > 0 ? (
          <HomeCard home={homes[index]} />
        ) : (
          <Box textAlign="center" fontSize="xl">
            No homes found!
          </Box>
        )}
      </Box>
      <Flex justifyContent="center" gap={8} p={4} height="10%">
        <IconButton
          icon={<FaArrowLeft />}
          colorScheme="yellow"
          aria-label="Back"
          size="lg"
          onClick={handleBack}
          isDisabled={viewedHomes.length === 0} // Disables if no homes are viewed
        />
        <IconButton
          icon={<FaTimes />}
          colorScheme="red"
          aria-label="Dislike"
          size="lg"
          onClick={handleNext}
        />
        <IconButton
          icon={<FaHeart />}
          colorScheme="green"
          aria-label="Like"
          size="lg"
          onClick={handleNext}
        />
        <IconButton
          icon={<FaStar />}
          colorScheme="blue"
          aria-label="Favorite"
          size="lg"
          onClick={handleFavorite}
        />
      </Flex>
    </Box>
  );
};

export default CardContainer;
