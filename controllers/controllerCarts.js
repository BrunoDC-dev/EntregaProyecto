const Carts = require('../Daos/DaosCarts.js');
const carts = new Carts();
//const Carts = require('../containers/containerArchivo.js');
//const carts = new Carts("carrito.json", ["timestamp", "products"]);
//const products = new Carts("productos.json", ["timestamp", "name", "price", "description", "code", "pic", "stock"]);

let admin;

//Add a cart
const addCart = async(req, res) => {
    await carts.save(req.body);
    res.json({ message: 'Carrito agregado' });
}

//Delete cart
const deleteCart = async(req, res) => {
    await carts.deleteById(req.params.id);
    res.json({ message: 'Carrito eliminado' });
}

//Get products from cart
const getProducts = async(req, res) => {
    const cartSelected = await carts.getProducts(req.params.id);
    res.send(cartSelected);
}

//Add product to cart
const addProduct = async(req, res) => {
    carts.saveProduct(req.params.id_prod, req.params.id);
    //si se usa los archivos como base de datos:
    // console.log(req.params.id_prod)
    //const product = await products.getById(req.params.id_prod);
    //console.log(product)
    //await carts.addToArrayById(req.params.id, { "products": product });
    res.json({ message: 'Producto agregado' });
}

//Delete product from cart
const deleteProduct = async(req, res) => {
    carts.deleteProduct(req.params.id, req.params.id_prod);
    //si se usa los archivos como base de datos
    //await products.getById(req.params.id_prod);
    //await carts.removeFromArrayById(req.params.id, req.params.id_prod, 'products')
    res.json({ message: 'Producto eliminado' });
}

module.exports = { addCart, deleteCart, getProducts, addProduct, deleteProduct };