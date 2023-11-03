const express = require("express");
const todoController = require("../controller/todoController");

const router = express.Router();

router
	.route("/todos")
	.get(authController.protect, todoController.getTodos)
	.post(authController.protect, todoController.createTodo);

router
	.route("/todos/:id")
	.get(authController.protect, todoController.getTodo)
	.patch(authController.protect, todoController.updateTodo)
	.delete(authController.protect, todoController.deleteTodo);

module.exports = router;
