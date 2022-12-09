const express = require('express');
const app = express();
const authMiddleware = require('./middlewares/authmiddleware')
const routerProducts = require('./routes/product')
const routerCart = require('./routes/carrito')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use(authMiddleware);
module.exports = app