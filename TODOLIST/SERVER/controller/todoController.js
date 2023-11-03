const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new todo
exports.createTodo = catchAsync(async (req, res, next) => {
	const newTodo = await Todo.create({
		title: req.body.title,
		description: req.body.description,
		user: req.user._id, // Associate the todo with the logged-in user
	});

	res.status(201).json({
		status: "success",
		data: {
			todo: newTodo,
		},
	});
});

// Get a specific todo by ID
exports.getTodo = catchAsync(async (req, res, next) => {
	const todo = await Todo.findOne({
		_id: req.params.id,
		user: req.user._id, // Only retrieve todos associated with the logged-in user
	});

	if (!todo) {
		return next(new AppError("Todo not found", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			todo,
		},
	});
});

// Get all todos for the logged-in user
exports.getTodos = catchAsync(async (req, res, next) => {
	const todos = await Todo.find({ user: req.user._id });

	res.status(200).json({
		status: "success",
		results: todos.length,
		data: {
			todos,
		},
	});
});

// Update a specific todo
exports.updateTodo = catchAsync(async (req, res, next) => {
	const todo = await Todo.findOneAndUpdate(
		{
			_id: req.params.id,
			user: req.user._id, // Only update todos associated with the logged-in user
		},
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!todo) {
		return next(new AppError("Todo not found", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			todo,
		},
	});
});

// Delete a specific todo
exports.deleteTodo = catchAsync(async (req, res, next) => {
	const todo = await Todo.findOneAndDelete({
		_id: req.params.id,
		user: req.user._id, // Only delete todos associated with the logged-in user
	});

	if (!todo) {
		return next(new AppError("Todo not found", 404));
	}

	res.status(204).json();
});
