const Product = require('../models/Product');

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des produits.' });
    }
};

// Ajouter un nouveau produit
exports.createProduct = async (req, res) => {
    const { name, category, description, price, stock, imageUrl } = req.body;

    const newProduct = new Product({
        name,
        category,
        description,
        price,
        stock,
        imageUrl,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du produit.' });
    }
};

// Récupérer un produit par ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la récupération du produit.' });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    const { name, category, description, price, stock, imageUrl } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, description, price, stock, imageUrl },
            { new: true } // Retourner le produit mis à jour
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour du produit.' });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Produit non trouvé.' });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur lors de la suppression du produit.' });
    }
};
