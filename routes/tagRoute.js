const express = require('express');
const tagRouter = express.Router();
const authenticate = require('../middlewares/authenticate')
const { AdminMiddleware } = require('../middlewares/commonMiddleware')


const { 
  list_allTags,
  find_oneTag,
  create_oneTag,
  delete_oneTag } = require('../controllers/tagController')

tagRouter.get("/:id", find_oneTag);
tagRouter.delete("/:id", delete_oneTag);
tagRouter.get("/", list_allTags);
tagRouter.post('/', create_oneTag)

module.exports = tagRouter

