const Tag = require("../models/tagModel");

exports.list_allTags = async (req, res, next) => {
  try {
    const allTags = await Tag.find();
    if (!allTags) return res.status(404).send("No tags");
    res.status(200).json({allTags});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.find_oneTag = async (req, res, next) => {
  const tagId = req.params.id;
  try {
    const oneTag = await Tag.findById(tagId);
    if (!oneTag) return res.status(404).send("This tag does not exist");
    res.status(200).json({oneTag});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.create_oneTag = async (req, res, next) => {
  const { name } = req.body;
  let tag = await Tag.findOne({ name: name });
          if (tag) {
            return res.status(401).json({ errors: [{ msg: "Tag already exists ! " }] });
          } 
  try {
    let tag = new Tag({ name });
    tag = await tag.save();
    res.status(200).json({tag});
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};

exports.delete_oneTag = async (req, res, next) => {
  const tagId = req.params.id;
  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId)
        if (!deletedTag) res.status(404).json({errors : [{msg : 'Tag does not exist !'}]});
        res.status(200).json({deletedTag})
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: error.message }] });
  }
};