import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import BottomNavigation from "./components/BottomNavigation";
// import Calculator from "./components/Calculator";
// import ToggleView from "./components/ToggleView";
// import Messages from "./components/Messages";
// import Profile from "./components/Profile";
import CardContainer from "./components/CardContainer";

function App() {
  return (
    <Router>
      <Box className="App" height="calc(100vh - 60px)">
        <Routes>
          <Route path="/" element={<CardContainer />} />
          {/* <Route path="/calculator" element={<Calculator />} />
          <Route path="/toggle-view" element={<ToggleView />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
        <BottomNavigation />
      </Box>
    </Router>
  );
}

export default App;
