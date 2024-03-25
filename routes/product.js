// routes/product.js
const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

// Upload product route
router.post("/uploadProduct", async (req, res) => {
  const data = await productModel(req.body);
  await data.save();
  res.send({ message: "Upload successfully" });
});

router.delete("/deleteProduct", async (req, res) => {
  const { name, category } = req.body;

  await productModel.findOneAndDelete({
    name: name,
  });

  res.send({ message: "Deleted successfully" });
});

// router.get("/findOne", async (req, res) => {
//   const name = req.body.name;
//   console.log(name);
//   const data = await productModel.findOne({
//     name: name,
//   });

//   res.send(JSON.stringify(data));
// });

// Fetch products route
router.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

module.exports = router;
