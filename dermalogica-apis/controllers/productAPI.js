import mongoose from "mongoose";
import Product from "../models/addProduct.js";

const addProducts = async (req, res) => {
  try {
    let product = new Product(req.body);
    let response = await product.save();
    res.status(200).json({
      success: true,
      message: "Product Inserted Successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const bulkProductsAdd = async (req, res) => {
  try {
    const products = req.body;
    const responses = [];

    for (const productData of products) {
      const product = new Product(productData);
      const response = await product.save();
      responses.push(response);
    }

    res.status(200).json({
      success: true,
      message: "Products Inserted Successfully",
      data: responses,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const getProduct = await Product.find();
    res.status(200).json({
      success: true,
      message: "Product get successfully",
      data: getProduct,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
const GetSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Id", id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log("product", product);
    res.json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export {
  addProducts,
  bulkProductsAdd,
  updateProduct,
  getProduct,
  deleteProduct,
  GetSingleProduct
};
