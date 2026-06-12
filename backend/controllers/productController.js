const Product = require('../models/Product');

// @GET /api/products — Saare products lao
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @GET /api/products/:id — Ek product lao
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product nahi mila' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @POST /api/products — Naya product banao (Admin only)
const createProduct = async (req, res) => {
    console.log('Request aayi!'); // ← yeh add karo
    console.log(req.body);        // ← yeh bhi
    const { name, description, price, image, category, stock } = req.body;

    try {
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category,
            stock
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @PUT /api/products/:id — Product update karo (Admin only)
const updateProduct = async (req, res) => {
    const { name, description, price, image, category, stock } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product nahi mila' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @DELETE /api/products/:id — Product delete karo (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product nahi mila' });
        }

        await product.deleteOne();
        res.json({ message: 'Product delete ho gaya' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};