const express = require("express");
const { connect } = require("mongoose");
const routerProducts = require('./routes/routerProducts.js');
const routerCarts = require('./routes/routerCarts.js');
const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
app.use('/api/cart', routerCarts);

const server = app.listen(PORT, async() => {
    await connect('mongodb+srv://bruno:brunoyvalen2709@cluster0.swjtrex.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Server running on PORT ${PORT}`);
});

server.on('error', err => console.log(err));