import express from "express";
const router = express.Router();

const displayAllProducts = require("./api/products/displayAllProducts");
const displayProductInfo = require("./api/products/displayProductInfo");
const createNewProduct = require("./api/products/createNewProduct.ts");
const saveEditProduct = require("./api/products/saveEditProduct");
const deleteProduct = require("./api/products/deleteProduct");

const displayUserInfo = require("./api/users/displayUserInfo");
const displayCurrentUserInfo = require("./api/users/displayCurrentUserInfo");
const createNewUser = require("./api/users/createNewUser.ts");
const signinValidation = require("./api/users/signinValidation.ts");

const createShoppingOrder = require("./api/orders/createShoppingOrder.ts");
const getOrderDetails = require("./api/orders/getOrderDetails.ts");
const getLastOrder = require("./api/orders/getLastOrder.ts");
const displayUserOrderInfo = require("./api/orders/displayUserOrderInfo");
const updateProductQuantity = require("./api/products/updateProductQuantity");

router.get("/", displayAllProducts);
router.get("/product/:id", displayProductInfo);
router.post("/product", createNewProduct);
router.post("/product/edit/:id", saveEditProduct);
router.delete("/product/delete/:id", deleteProduct);

router.get("/user", displayUserInfo);
router.get("/user/:id", displayCurrentUserInfo);
router.post("/signup", createNewUser);
router.post("/signin", signinValidation);

router.get("/order/:id", getOrderDetails);
router.get("/lastOrder/", getLastOrder);
router.get("/user/order/:id", displayUserOrderInfo);
router.post("/order", createShoppingOrder);
router.post("/product/order/:id", updateProductQuantity);

module.exports = router;
