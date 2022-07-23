const Brand = require("../models/brandModel");

exports.list_allBrands = async (req, res, next) => {
  try {
    const allBrands = await Brand.find();
    if (!allBrands) return res.status(404).send("No brands");
    res.status(200).json({allBrands});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.find_oneBrand = async (req, res, next) => {
  const brandId = req.params.id;
  try {
    const oneBrand = await Brand.findById(brandId);
    if (!oneBrand) return res.status(404).send("This brand does not exist");
    res.status(200).json({oneBrand});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.create_oneBrand = async (req, res, next) => {
  const { name } = req.body;
  let brand = await Brand.findOne({ name });
          if (brand) {
            return res.status(401).json({ errors: [{ msg: "Brand already exists ! " }] });
          }
  try {
    let brand = new Brand({ name });
    brand = await brand.save();
    res.status(200).json({brand});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.delete_oneBrand = async (req, res, next) => {
  const brandId = req.params.id;
  try {
    const deletedBrand = await Brand.findByIdAndDelete(brandId)
        if (!deletedBrand) res.status(404).json({errors : [{msg : 'Brand does not exist !'}]});
        res.status(200).json({deletedBrand})
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

