const Products = require('../Daos/DaosProducts.js');
const products = new Products;


//Get all products or product selected
const getProducts = async(req, res,next) => {
    try {
        if (req.params.id == undefined) return res.json(await products.getAll());
        const product = await products.getById(req.params.id);
        console.log(product);
        if (!product) return res.status(404).send({ message: 'El ID no pertenece a un producto listado' });
        res.json(product);   
    } catch (error) {
        next(error)
    }
}

//Add product
const addProduct = async(req, res, next) => {
    try {
        const { name, description, code, pic, price, stock } = req.body;
        await products.save({ name, description, code, pic, price, stock });
        res.json({ message: 'Producto agregado' });   
    } catch (error) {
        next(error)
    }
}

//Update product
const updateProduct = async(req, res,next) => {
    try {
        await products.updateProduct(req.params.id, req.body);
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        next(error)
    }
}

//Delete product
const deleteProduct = async(req, res,next) => {
    try {
        await products.deleteById(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        next(error)
    }
};

module.exports = { products, getProducts, addProduct, updateProduct, deleteProduct };