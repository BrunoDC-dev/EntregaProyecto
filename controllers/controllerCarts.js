const Carts = require('../Daos/DaosCarts.js');
const carts = new Carts();

const getCarts = async(req, res,next) => {
    try {
        if (req.params.id == undefined) return res.json(await carts.getAll());
        const cart = await carts.getById(req.params.id);
        console.log(cart);
        if (!cart) return res.status(404).send({ message: 'El ID no pertenece a un producto listado' });
        res.json(cart);   
    } catch (error) {
        next(error)
    }
}
//Add a cart
const addCart = async(req, res,next) => {
    try {
        await carts.save(req.body);
        res.json({ message: 'Carrito agregado' });   
    } catch (error) {
        next(error)
    }
}

//Delete cart
const deleteCart = async(req, res,next) => {
    try {
        await carts.deleteById(req.params.id);
        res.json({ message: 'Carrito eliminado' });   
    } catch (error) {
        next(error)
    }
}

//Get products from cart
const getProducts = async(req, res,next) => {
    try {
        const cartSelected = await carts.getProducts(req.params.id);
        res.json(cartSelected);   
    } catch (error) {
        next(error)
    }
}

//Add product to cart
const addProduct = async(req, res,next) => {
    try {
        carts.saveProduct(req.params.id_prod, req.params.id);
        res.json({ message: 'Producto agregado' });   
    } catch (error) {
        next(error)
    }
}

//Delete product from cart
const deleteProduct = async(req, res,next) => {
    try {
        carts.deleteProduct(req.params.id, req.params.id_prod);
        res.json({ message: 'Producto eliminado' });   
    } catch (error) {
        next(error)
    }
}

module.exports = {getCarts, addCart, deleteCart, getProducts, addProduct, deleteProduct };