const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config({ path: "./config.env" });

const db = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to Database!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`backend running on port ${port}`);
});
