const express = require("express");
const controller = require("./../controllers/comments"); 
const validate = require("../middlewares/validate");
const {createCommentValidator, addReplyValidator } = require("../validators/comment");
const auth = require("./../middlewares/auth"); 

const router = express.Router();

router.get("/all", controller.getAllComments); 

router.post("/:href/create", auth , validate(createCommentValidator), controller.createComment);

router.post("/:commentId/reply", auth, validate(addReplyValidator) ,controller.addReply);

router.delete("/:commentId", auth, controller.removeComment);

router.delete("/:commentId/reply/:replyId", auth, controller.removeReply);

module.exports = router;
