import React, { useState, useEffect, Fragment } from "react";
import { UserLayout } from "../layout";
import {
	createTodo,
	fetchTodos,
	updateTodo,
	deleteTodo,
} from "../functions/todoServices";
function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [newTodoDescription, setNewTodoDescription] = useState("");
	const [newTodoPriority, setNewTodoPriority] = useState("medium");
	const [newTodoNotes, setNewTodoNotes] = useState([]);
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			window.location.href = "/";
		}
	}, []);
	useEffect(() => {
		fetchTodos()
			.then((data) => setTodos(data.data.todos))
			.catch((error) => console.error("Error fetching todos:", error));
	}, []);
	const handleNoteChange = (e, index) => {
		const updatedNotes = [...newTodoNotes];
		updatedNotes[index] = e.target.value;
		setNewTodoNotes(updatedNotes);
	};

	const handleAddNote = () => {
		setNewTodoNotes([...newTodoNotes, ""]);
	};

	const handleRemoveNote = (index) => {
		const updatedNotes = [...newTodoNotes];
		updatedNotes.splice(index, 1);
		setNewTodoNotes(updatedNotes);
	};
	const handleCreateTodo = async (e) => {
		e.preventDefault();

		const newTodoData = {
			title: newTodo,
			description: newTodoDescription,
			priority: newTodoPriority,
			notes: newTodoNotes.map((note) => ({ text: note })),
		};

		try {
			const response = await createTodo(newTodoData);

			if (response.data) {
				const newTodo = response.data.todo;
				setTodos([...todos, newTodo]);
				setNewTodo("");
				setNewTodoDescription("");
				setNewTodoPriority("medium");
				setNewTodoNotes([""]);
			} else {
				console.error("Failed to create todo.");
			}
		} catch (error) {
			console.error("Error creating todo:", error);
		}
	};

	const handleUpdateTodo = async (todoId) => {
		const todoToUpdate = todos.find((todo) => todo._id === todoId);

		if (!todoToUpdate) {
			console.error("Todo not found for update.");
			return;
		}

		try {
			const response = await updateTodo(todoId, {
				title: todoToUpdate.title,
			});
			if (response.data) {
				const updatedTodo = response.data.todo;
				const updatedTodos = todos.map((todo) =>
					todo._id === todoId ? updatedTodo : todo
				);
				setTodos(updatedTodos);
				setEditingTodoId(null);
			} else {
				console.error("Failed to update todo.");
			}
		} catch (error) {
			console.error("Error updating todo:", error);
		}
	};

	const handleDeleteTodo = async (todoId) => {
		try {
			const response = await deleteTodo(todoId);

			if (response) {
				const updatedTodos = todos.filter((todo) => todo._id !== todoId);
				setTodos(updatedTodos);
			} else {
				console.error("Failed to delete todo.");
			}
		} catch (error) {
			console.error("Error deleting todo:", error);
		}
	};
	const email = localStorage.getItem("email");
	const firstName = localStorage.getItem("firstName");
	const lastName = localStorage.getItem("lastName");
	return (
		<Fragment>
			<UserLayout>
				<div className="dashboard">
					<div className="user-greeting">
						<h1 className="heading">welcome, {firstName + " " + lastName}</h1>
						<span className="user-email">email: {email}</span>
					</div>
					<div>
						<h2>Todo List</h2>
						<form onSubmit={handleCreateTodo}>
							<input
								type="text"
								placeholder="New Todo"
								value={newTodo}
								onChange={(e) => setNewTodo(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Description"
								value={newTodoDescription}
								onChange={(e) => setNewTodoDescription(e.target.value)}
							/>
							<select
								value={newTodoPriority}
								onChange={(e) => setNewTodoPriority(e.target.value)}
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
							<ul>
								{newTodoNotes.map((note, index) => (
									<li key={index}>
										<input
											type="text"
											placeholder="Note"
											value={note}
											onChange={(e) => handleNoteChange(e, index)}
										/>
										<button onClick={() => handleRemoveNote(index)}>
											Remove
										</button>
									</li>
								))}
							</ul>
							<button type="submit">Add</button>
						</form>

						<ul>
							{todos.map((todo) => (
								<li key={todo._id}>
									{editingTodoId === todo._id ? (
										<div>
											<input
												type="text"
												value={todo.title}
												onChange={(e) => {
													const updatedTodos = [...todos];
													const index = updatedTodos.findIndex(
														(item) => item._id === todo._id
													);
													updatedTodos[index].title = e.target.value;
													setTodos(updatedTodos);
												}}
											/>
											<button onClick={() => handleUpdateTodo(todo._id)}>
												Save
											</button>
											<button onClick={() => setEditingTodoId(null)}>
												Cancel
											</button>
										</div>
									) : (
										<div>
											<span>{todo.title}</span>
											<button onClick={() => setEditingTodoId(todo._id)}>
												Edit
											</button>
											<button onClick={() => handleDeleteTodo(todo._id)}>
												Delete
											</button>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</UserLayout>
		</Fragment>
	);
}
export default Dashboard;
