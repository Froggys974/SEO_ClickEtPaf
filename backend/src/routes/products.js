const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

module.exports = (server) => {
  // Routes
  server.route("product")
  .get(productController.getAllProducts) // Récupérer tous les produits
  .post(productController.createProduct); // Créer un produit*

  server.route("product/:id").get(productController.getProductById) // Récupérer un produit par ID
  .put(productController.updateProduct) // Mettre à jour un produit
  .delete(productController.deleteProduct); // Supprimer un produit
};
