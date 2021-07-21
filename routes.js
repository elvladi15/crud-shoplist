const express = require("express");
const router = express.Router();
const productList = require("./products.json");

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/create-product", (req, res) => {
    res.render("createProduct.ejs");
});

router.get("/list-products", (req, res) => {
    res.render("listProducts.ejs", {
        product_list: productList
    });
});

router.get("/update-product", (req, res) => {
    res.render("updateProduct.ejs", {
        product_list: productList
    });
});

router.get("/delete-product", (req, res) => {
    res.render("deleteProduct.ejs", {
        product_list: productList
    });
});

router.get("*", (req, res) => {
    res.end("La página no existe");
});

module.exports = router;