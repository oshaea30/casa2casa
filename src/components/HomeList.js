import React, { useState, useEffect } from "react";
import { Box, Grid, Text, Image, Link, Spinner } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const HomeList = () => {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/homes")
      .then((response) => {
        setHomes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the homes!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {homes.map((home) => (
          <Box
            key={home.mlsId}
            bg="white"
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
          >
            <Link as={RouterLink} to={`/home/${home.mlsId}`}>
              <Image
                src={home.photos[0]}
                alt={home.address.full}
                width="100%"
                height="200px"
                objectFit="cover"
              />
              <Box p={4}>
                <Text fontSize="xl" fontWeight="bold">
                  {home.address.full}
                </Text>
                <Text fontSize="lg">${home.listPrice.toLocaleString()}</Text>
                <Text fontSize="md">
                  {home.property.bedrooms} bds | {home.property.bathsFull} ba |{" "}
                  {home.property.area} sqft
                </Text>
              </Box>
            </Link>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeList;
