const express = require('express');
const router = express.Router();

// Récupérer tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Ajouter un nouveau produit
router.post('/', async (req, res) => {
    const { name, category, description, price } = req.body;

    const newProduct = new Product({
        name,
        category,
        description,
        price,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: 'Erreur lors de la création du produit' });
    }
});

// Récupérer un produit par ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
