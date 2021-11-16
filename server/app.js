const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

// middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(helmet());

app.use((req, res, next) => {
  console.log("Hello from middleware!!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes
app.use("/api", userRouter);

module.exports = app;
