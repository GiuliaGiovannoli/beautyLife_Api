const Product = require("../models/productModel");
const Tag = require("../models/tagModel");
const Brand = require("../models/brandModel");
const Category = require("../models/categoryModel");
const { validationResult } = require("express-validator");


/* @usage : Upload a Product
    @url : /api/products
    @fields : product_name, product_price, quantity_in_stock, product_image, product_description, product_usage, 
    product_ingredients, product_is_offer, product_brand, product_tag, product_category
    @method : POST
    @access : PRIVATE */
exports.create_oneProduct = async (req, res, next) => {
  try {
    let {
      product_name,
      product_price,
      quantity_in_stock,
      product_description,
      product_usage,
      product_ingredients,
      product_categories,
      product_tags,
      product_brands
    } = req.body;

    let product_image = req.file.path
    let product = new Product({
      product_name,
      product_price,
      quantity_in_stock,
      product_image: product_image,
      product_description,
      product_usage,
      product_ingredients,
      product_categories,
      product_tags,
      product_brands
    });
    product = await product.save();
    res.status(200).json({ msg: "New product uploaded", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

/* @usage : delete ONE Product BASE OF ID
    @url : /api/products/:id
    @fields : 
    @method : delete
    @access : private */
exports.delete_oneProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct)
      res.status(404).json({ errors: [{ msg: "Product doesn't exists  ! " }] });
    res.status(200).json({ deletedProduct });
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
};

/* @usage : Get All  Product
    @url : /api/products
    @fields : 
    @method : get
    @access : public */
exports.list_allProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find().populate('product_brands').populate('product_categories').populate('product_tags')
    if (!allProducts)
      return res
        .status(404)
        .json({ errors: [{ msg: "Product doesn't exists  ! " }] });
    res.status(200).json(allProducts);
  } catch (e) {
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
};

/* @usage : Get ONE Product BASE OF ID
    @url : /api/products/:id
    @fields : 
    @method : get
    @access : public */
exports.find_oneProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneProduct = await Product.findById(id).populate('product_brands').populate('product_categories').populate('product_tags')
    if (!oneProduct)
      return res.status(404).json({ errors: [{ msg: "Product doesn't exists  ! " }] });
    res.status(200).json({ oneProduct });
  } catch (e) {
    console.log(e)
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
};

exports.filter_productByName = async (req, res, next) => {
  const { name } = req.params
  try {
    const namedProducts = await Product.find({ product_name: name })
    if (namedProducts.length < 1) res.status(404).send("No product with this name found");
    res.status(200).json({ namedProducts });
  } catch (e) {
    console.log(e)
    res.status(500).json({ errors: [{ msg: e.message }] });
  }
}

exports.filter_productByBrand = async (req, res, next) => {
  const { name } = req.params
  try {
    const matchingProducts = await Product.aggregate([
      {
        $lookup: {
          from: "brands",
          localField: "product_brands",
          foreignField: "_id",
          as: "brandInfo"
        }
      },
      { $match: { "brandInfo.name": name } },
    ]);
    res.status(200).json({ matchingProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.filter_productByCategory = async (req, res, next) => {
  const { name } = req.params
  try {
    const matchingProducts = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "product_categories",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      { $match: { "categoryInfo.name": name } },
    ]);
    res.status(200).json({ matchingProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.filter_productByTag = async (req, res, next) => {
  const { name } = req.params
  try {
    const matchingProducts = await Product.aggregate([
      {
        $lookup: {
          from: "tags",
          localField: "product_tags",
          foreignField: "_id",
          as: "tagInfo"
        }
      },
      { $match: { "tagInfo.name": name } },
    ]);
    res.status(200).json({ matchingProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};


/* @usage : update ONE Product BASE OF ID
    @url : /api/products/:id
    @fields : 
    @method : post
    @access : private */
//check it again

exports.update_oneProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    let updatedProduct = await Product.findOneAndUpdate({ _id: productId }, { ...req.body, product_image: req.file.path }, { new: true });
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};



