const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5001;

const apiKey = process.env.SIMPLYRETS_API_KEY;
const apiSecret = process.env.SIMPLYRETS_API_SECRET;

// Route to get MLS properties
app.use(cors());

app.get("/api/homes", async (req, res) => {
  try {
    const response = await axios.get("https://api.simplyrets.com/properties", {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from SimplyRETS:", error);
    res.status(500).json({ error: "Failed to fetch homes data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Will remove after testing
  console.log("API Key:", process.env.SIMPLYRETS_API_KEY);
  console.log("API Secret:", process.env.SIMPLYRETS_API_SECRET);
});
