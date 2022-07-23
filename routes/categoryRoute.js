const express = require("express");
const categoryRouter = express.Router();
const authenticate = require('../middlewares/authenticate')
const { AdminMiddleware } = require('../middlewares/commonMiddleware')
const uploadMulter = require('../middlewares/imageUploader')

const {
  list_allCategories,
  find_oneCategory,
  create_oneCategory,
  delete_oneCategory
} = require("../controllers/categoryController");

categoryRouter.get("/:id", find_oneCategory);
categoryRouter.delete("/:id", delete_oneCategory);
categoryRouter.get("/", list_allCategories);
categoryRouter.post("/", uploadMulter.single("Cate_image"), create_oneCategory);

module.exports = categoryRouter;
