const Product = require("../models/Product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

const addProduct = (req, res) => {
  const { partyname, challn, quality, kg,meter, roll } = req.body;
  const userId = req.user.userId;
  console.log(userId);

  // Create a new product document
  const newProduct = new Product({
    userID: userId,
    partyname: partyname,
    challn: challn,
    quality: quality,
    kg: kg,
    meter: meter,
    roll: roll,
  });

  // Save the product document to the database
  newProduct
    .save()
    .then((result) => {
      console.log("Product saved:", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error("Error saving product:", err);
      res.status(500).send("Error saving product");
    });
};



// Get All Products
const getAllProducts = async (req, res) => {
  const findAllProducts = await Product.find({
    userID: req.params.userId,
  }).sort({ _id: -1 }); // -1 for descending;
  res.json(findAllProducts);
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { ProductID: req.params.id }
  );

  const deleteSaleProduct = await Sales.deleteOne(
    { ProductID: req.params.id }
  );
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  try {
    const updatedResult = await Product.findByIdAndUpdate(
      { _id: req.body.productID },
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};