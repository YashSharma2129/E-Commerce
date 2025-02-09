const mongoose = require("mongoose");
const Product = require("./productDB.js");
const User = require("./userDB.js");
const credentials = require("../credentials.js");

const dbUrl =
  "mongodb://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  ":" +
  credentials.port +
  "/" +
  credentials.database;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const seedProducts = [
  {
    title: "Food",
    description: "Yummy",
    quantity: 100,
    price: 10,
  },
  {
    title: "Cloth",
    description: "Good",
    quantity: 200,
    price: 100,
  },
  {
    title: "Phone",
    description: "Apple",
    quantity: 10,
    price: 1000,
  },
];

const seedUsers = [
  {
    firstName: "A",
    lastName: "B",
    email: "AB@AB.com",
    secret: "123456",
  },
];

const insertData = async () => {
  await Product.deleteMany({});
  await User.deleteMany({});

  Product.insertMany(seedProducts)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });

  User.insertMany(seedUsers)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
};

insertData();
