const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.set('view engine', 'ejs');


mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT ;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes/index");
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
