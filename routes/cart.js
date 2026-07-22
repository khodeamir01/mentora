const express = require("express");
const auth  = require("./../middlewares/auth");

const Controller = require("./../controllers/cart");
const validate = require("../middlewares/validate");
const {addToCartValidator, removeFromCartValidator } = require("../validators/cart");


const router = express.Router();

router.route("/").get(auth ,Controller.getCart)
router.route("/add").post(auth , validate(addToCartValidator) , Controller.addToCart)
router.route("/remove").delete(auth, validate(removeFromCartValidator) ,Controller.removeFromCart)

module.exports = router


