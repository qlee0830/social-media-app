const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

// imported routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();

dotenv.config({});

const db = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Database!"));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`backend running on port ${port}`);
});
