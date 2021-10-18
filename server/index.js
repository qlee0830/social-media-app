const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

app.listen(3000, () => {
  console.log("backend running on port 3000!");
});
