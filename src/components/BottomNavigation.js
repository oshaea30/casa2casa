import React from "react";
import { Box, Flex, IconButton, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  CalendarIcon,
  ViewIcon,
  ChatIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

const BottomNavigation = () => {
  return (
    <Box position="fixed" bottom="0" width="100%" bg="white" boxShadow="sm">
      <Flex justifyContent="space-around" p={2} mb={8}>
        <HStack spacing={8}>
          <RouterLink to="/calculator">
            <IconButton
              icon={<CalendarIcon />}
              variant="ghost"
              aria-label="Mortgage Calculator"
            />
          </RouterLink>
          <RouterLink to="/toggle-view">
            <IconButton
              icon={<ViewIcon />}
              variant="ghost"
              aria-label="Toggle View"
            />
          </RouterLink>
          <RouterLink to="/messages">
            <IconButton
              icon={<ChatIcon />}
              variant="ghost"
              aria-label="Messages"
            />
          </RouterLink>
          <RouterLink to="/profile">
            <IconButton
              icon={<SettingsIcon />}
              variant="ghost"
              aria-label="Profile"
            />
          </RouterLink>
        </HStack>
      </Flex>
    </Box>
  );
};

export default BottomNavigation;
