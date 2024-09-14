const axios = require("axios");

const getHomes = async (req, res) => {
  try {
    const response = await axios.get("MLS_API_ENDPOINT_HERE");
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getHomes };
