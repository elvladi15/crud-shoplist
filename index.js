const express = require("express");
const fs = require("fs");
const routes = require("./routes");
const productList = require("./products.json");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

//routes
app.use(routes);

function changeFile(message) {
    fs.writeFile("products.json", JSON.stringify(productList), () => {
        console.log(message);
    });
}
function getNameIndex(name) {
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name === name) {
            return i;
        }
    }
    return null;
}
//POST methods
app.post("/create-product", urlencodedParser, (req, res) => {
    let message = "";
    if (getNameIndex(req.body.productName) !== null) {
        message = `El producto ${req.body.productName} ya existe en la lista.`;
    }
    else {
        productList.push({
            name: req.body.productName
        })
        changeFile("product added");
        message = `El producto ${req.body.productName} ha sido añadido exitosamente.`;
    }

    res.render("product-success.ejs", {
        message: message
    });
});
app.post("/delete-product", urlencodedParser, (req, res) => {
    let message = "";
    //find index of the name
    let index = getNameIndex(req.body.productName);
    if (index === null) {
        message = `El producto ${req.body.productName} no existe en la lista.`;
    }
    else {
        productList.splice(index, 1);
        changeFile("product deleted");
        message = `El producto ${req.body.productName} ha sido eliminado exitosamente.`
    }
    res.render("product-success.ejs", {
        message: message
    });
});
app.post("/update-product", urlencodedParser, (req, res) => {
    let message = "";
    //find index of the name
    let index = getNameIndex(req.body.productName);
    if (index === null) {
        message = `El producto ${req.body.productName} no existe en la lista.`;
    }
    else {
        let indexNew = getNameIndex(req.body.newName);
        if (indexNew !== null) {
            message = `El nuevo nombre del producto ${req.body.newName} ya existe en la lista.`;
        }
        else if (req.body.productName === req.body.newName) {
            message=`El nombre nuevo del producto ${req.body.productName} el igual al nombre anterior`;
        }
        else {
            productList[index].name = req.body.newName;
            changeFile("product updated");
            message = `El producto ${req.body.productName} ha sido cambiado a ${req.body.newName} exitosamente.`
        }
    }
    res.render("product-success.ejs", {
        message: message
    });
});
app.listen(3000, () => {
    console.log("Server running at port 3000");
});