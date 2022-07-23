const express = require("express");
const productRouter = express.Router();
const { body } = require("express-validator");
const authenticate = require("../middlewares/authenticate");
const { AdminMiddleware } = require('../middlewares/commonMiddleware')
const uploadMulter = require('../middlewares/imageUploader')

const {
   list_allProducts,
   create_oneProduct,
   find_oneProduct,
   delete_oneProduct,
   filter_productByName,
   filter_productByTag,
   filter_productByBrand,
   filter_productByCategory,
   update_oneProduct
} = require("../controllers/productController");


// USE MULTER

/* @usage : Get Some Products BASE OF something
   @method : get
   @access : public */
   productRouter.get("/find/category/brand/tag/:name", filter_productByTag)
   productRouter.get("/find/category/brand/:name", filter_productByBrand)
   productRouter.get("/find/category/:name", filter_productByCategory)
   productRouter.get("/find/:name", filter_productByName);


productRouter.put("/:id", update_oneProduct);

/* @usage : Get ONE Product BASE OF ID
   @method : get
   @access : public */
productRouter.get("/:id", find_oneProduct);

/* @usage : delete ONE Product BASE OF ID
   @method : delete
   @access : private */
productRouter.delete("/:id", delete_oneProduct);

/* @usage : Get All  Product
   @method : get
   @access : public */
productRouter.get("/", list_allProducts);

/* @usage : create ONE Product 
   @method : post
   @access : private */
// productRouter.post("/", authenticate,AdminMiddleware, create_oneProduct);
productRouter.post("/", uploadMulter.single("product_image"), create_oneProduct);

module.exports = productRouter;



