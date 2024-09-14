import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  Link,
  CircularProgress,
  Image,
  Grid,
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
  FaUndo,
} from "react-icons/fa";
import HomeCard from "./HomeCard";
import axios from "axios";
import useScreenSize from "../hooks/useScreenSize";
import SwipeNavigation from "./swipeNavigation";

const CardContainer = () => {
  const [homes, setHomes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewedHomes, setViewedHomes] = useState([]); // Tracks viewed homes
  const [favorites, setFavorites] = useState([]); // Tracks favorite homes
  const isDesktop = useScreenSize();

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
    onSwipedRight: () => handleFavorite(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    delta: 10, // Lowering delta value to make swipe more sensitive until I figure out which swipe library to use.
  });

  if (loading) {
    return <CircularProgress />;
  }

  const currentHome = homes[index] || null;

  return (
    <Box height="100vh" position="relative">
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bg="white"
        height="60px"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        zIndex="1"
      >
        <Link as={RouterLink} to="/" fontWeight="bold">
          <Image
            src="/2CasaLogo.png"
            alt="2Casa Logo"
            height="80px"
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

      {/* Desktop view: Grid layout */}
      {isDesktop ? (
        <Grid templateColumns="350px 1fr" height="100%">
          {/* Left column */}
          <Flex
            direction="column"
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Box height="calc(100% - 80px)" overflow="hidden" {...handlers}>
              <HomeCard home={currentHome} />
            </Box>
            <Box>
              <SwipeNavigation
                handleBack={handleBack}
                handleNext={handleNext}
                handleFavorite={handleFavorite}
                viewedHomes={viewedHomes}
              />
            </Box>
          </Flex>

          {/* Right column */}
          <Flex justifyContent="center" alignItems="center" bg="gray.100">
            {currentHome && currentHome.photos && (
              <Image
                src={currentHome.photos[0]}
                alt={`Home interior`}
                maxHeight="90%"
                maxWidth="90%"
                objectFit="contain"
              />
            )}
          </Flex>
        </Grid>
      ) : (
        // Mobile view
        <>
          <Box
            {...handlers}
            position="absolute"
            top="60px"
            left="0"
            right="0"
            bottom="80px"
          >
            <HomeCard home={currentHome} />
            <Flex justifyContent="center" alignItems="center" gap={4} py={4}>
              <SwipeNavigation
                handleBack={handleBack}
                handleNext={handleNext}
                handleFavorite={handleFavorite}
                viewedHomes={viewedHomes}
              />
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CardContainer;
