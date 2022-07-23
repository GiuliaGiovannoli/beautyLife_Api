const express = require('express');
const brandRouter = express.Router();
const authenticate = require('../middlewares/authenticate')
const { AdminMiddleware } = require('../middlewares/commonMiddleware')


const { list_allBrands,
  find_oneBrand,
  create_oneBrand,
  delete_oneBrand } = require('../controllers/brandController')

brandRouter.get("/:id", find_oneBrand);
brandRouter.delete("/:id", delete_oneBrand);
brandRouter.get("/", list_allBrands);
brandRouter.post('/', create_oneBrand)

module.exports = brandRouter
