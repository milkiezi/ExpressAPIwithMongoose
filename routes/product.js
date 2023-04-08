const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');


async function getProducts(req, res, next) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
router.get('/',getProducts);


async function createProduct(req, res, next) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  
router.post('/',createProduct)

async function getProductById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

router.get('/:id',getProductById)

async function updateProductById(req, res, next) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
  
router.put('/:id',updateProductById)

async function deleteProductById(req, res, next) {
    try {
      const deletedProduct = await Product.findByIdAndRemove(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
  
router.delete('/:id',deleteProductById)

module.exports = router;