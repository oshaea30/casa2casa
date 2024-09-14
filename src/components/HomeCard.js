import React from "react";
import { Box, Image, Text, Flex } from "@chakra-ui/react";

const HomeCard = ({ home }) => {
  return (
    <Box
      position="relative"
      w="100%"
      h="70vh"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
    >
      <Image
        src={home.photos[0]}
        alt={home.address.full}
        objectFit="cover"
        w="100%"
        h="100%"
      />
      <Flex
        position="absolute"
        bottom="0"
        w="100%"
        p={4}
        bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0))"
        color="white"
        flexDirection="column"
      >
        <Text fontSize="xl" fontWeight="bold">
          ${home.listPrice.toLocaleString()}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {home.address.city}, {home.address.state}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {home.property.bedrooms} bds • {home.property.bathsFull} ba •{" "}
          {home.property.area} sqft
        </Text>
      </Flex>
    </Box>
  );
};

export default HomeCard;
