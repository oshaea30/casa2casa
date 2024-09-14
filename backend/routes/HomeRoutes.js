const express = require("express");
const { getHomes } = require("../controllers/HomeController");
const router = express.Router();

router.get("/", getHomes);

module.exports = router;
