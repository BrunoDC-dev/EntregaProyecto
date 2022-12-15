const express = require("express");
const dotenv = require("dotenv")
const { connect } = require("mongoose");
const routerProducts = require('./routes/routerProducts.js');
const routerCarts = require('./routes/routerCarts.js');
const errorHandler = require("./middlewares/errorHandler.js");
const app = express();
dotenv.config()
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler)
app.use('/api/products', routerProducts);
app.use('/api/cart', routerCarts);

const server = app.listen(PORT, async() => {
    await connect(process.env.MONGO_URL);
    console.log(`Server running on PORT ${PORT}`);
});

server.on('error', err => console.log(err));