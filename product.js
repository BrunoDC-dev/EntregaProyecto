const express = require('express');
const app = require('../app')
const authMiddleware = require('../middlewares/authmiddleware')
const Contenedor = require('../contenedor')
const contenedor = new Contenedor("productos.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const routerProducts = express.Router();

// GET api/productos
routerProducts.get('/', async(_req, res) => {
    try {
        const products = await contenedor.getAll();
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
    }
})

// GET api/productos/:id
routerProducts.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await contenedor.getById(id);

        product
            ?
            res.status(200).json(product) :
            res.status(400).json({ "error": "no encontrado" })
    } catch (error) {
        console.log(error)
    }
})

// POST api/productos
routerProducts.post('/', authMiddleware, async(req, res, next) => {
    try {
        const { body } = req;

        body.timestamp = Date.now();

        const newProductId = await contenedor.save(body);

        newProductId
            ?
            res.status(200).json({ "exito": "producto añadido con el id=" + newProductId }) :
            res.status(400).json({ "error": "invalido verificar el contenido del body" })
    } catch (error) {
        console.log(error)
    }
})

// PUT api/productos/:id
routerProducts.put('/:id', authMiddleware, async(req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const wasUpdated = await contenedor.updateById(id, body);

        wasUpdated
            ?
            res.status(200).json({ "exito": "producto actualizado" }) :
            res.status(404).json({ "error": "product not found" })
    } catch (error) {
        console.log(error)
    }
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', authMiddleware, async(req, res, next) => {
    try {
        const { id } = req.params;
        const wasDeleted = await contenedor.deleteById(id);

        wasDeleted
            ?
            res.status(200).json({ "exito": "producto eliminado" }) :
            res.status(404).json({ "error": "producto no encontrado" })
    } catch (error) {
        console.log(error)
    }
})
module.exports = routerProducts