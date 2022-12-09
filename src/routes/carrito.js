const express = require('express');
const Contenedor = require('../contenedor')
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])
const routerCart = express.Router();
// POST /api/carrito

routerCart.post('/', async(req, res) => {
    try {
        const { body } = req;

        body.timestamp = Date.now();
        body.products = [];
        const newCartId = await carrito.save(body);

        newCartId
            ?
            res.status(200).json({ "exito": "arry de carrito agregado con el id= " + newCartId }) :
            res.status(400).json({ "error": "invalido verificar el contenido del body" })
    } catch (error) {
        console.log(error)
    }

})

// DELETE /api/carrito/id
routerCart.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const wasDeleted = await carrito.deleteById(id);

        wasDeleted
            ?
            res.status(200).json({ "exito": "carrito elimnado " }) :
            res.status(404).json({ "error": "carrito no encontrado" })
    } catch (error) {
        console.log(error)
    }
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const product = await contenedor.getById(body['id']);

        if (product) {
            const cartExist = await carrito.addToArrayById(id, { "products": product });
            cartExist
                ?
                res.status(200).json({ "exito": "producto agregado" }) :
                res.status(404).json({ "error": "carrito no encontradol" })
        } else {
            res.status(404).json({ "error": "producto no encontrado veirficar que el id en el body es correcto" })
        }
    } catch (error) {
        console.log(error)
    }

})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    try {
        const { id } = req.params;
        const cart = await carrito.getById(id)

        cart
            ?
            res.status(200).json(cart.products) :
            res.status(404).json({ "error": "carrito no encontrado" })
    } catch (error) {
        console.log(error)
    }
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    try {
        const { id, id_prod } = req.params;
        const productExists = await contenedor.getById(id_prod);
        if (productExists) {
            const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
            cartExists
                ?
                res.status(200).json({ "exito": "producto eliminado" }) :
                res.status(404).json({ "error": "carrito no encontrado " })
        } else {
            res.status(404).json({ "error": "producto no encontrado" })
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = routerCart