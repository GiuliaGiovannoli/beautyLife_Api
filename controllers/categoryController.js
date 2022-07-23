const Category = require("../models/categoryModel");

exports.list_allCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    if (!allCategories) return res.status(404).send({ errors: [{ msg: 'No Categories !' }] });
    res.status(200).json({ allCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.find_oneCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const oneCategory = await Category.findById(categoryId);
    if (!oneCategory)
      return res.status(404).send("This category does not exist");
    res.status(200).json({ oneCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.create_oneCategory = async (req, res, next) => {
  const { name } = req.body;
  const image = req.file.path
  let findCategory = await Category.findOne({ name: name })
  if (findCategory) {
    return res.status(400).json({ errors: [{ msg: 'Category already Exists !' }] });
  }
  try {
    let category = new Category({ name: name, image: image });
    category = await category.save();
    res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.delete_oneCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId)
    if (!deletedCategory) res.status(404).json({ errors: [{ msg: 'Category does not exist !' }] });
    res.status(200).json({ deletedCategory })
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};
