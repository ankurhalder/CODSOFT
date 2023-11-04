import React, { useState, useEffect, Fragment, useRef } from "react";
import { UserLayout } from "../layout";
import {
	createTodo,
	fetchTodos,
	updateTodo,
	deleteTodo,
} from "../functions/todoServices";
import { updateUserImage, getUserProfileImage } from "../functions/userImage";

function formatDate(dateStr) {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateStr).toLocaleDateString(undefined, options);
}

function Dashboard() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [newTodoDescription, setNewTodoDescription] = useState("");
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");
	const [userImage, setUserImage] = useState("/user.png");
	const fileInputRef = useRef(null);
	const isAuthenticated = localStorage.getItem("authToken");
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

	const handleCreateTodo = async (e) => {
		e.preventDefault();

		const newTodoData = {
			title: newTodo,
			description: newTodoDescription,
		};

		try {
			const response = await createTodo(newTodoData);

			if (response.data) {
				const newTodo = response.data.todo;
				setTodos([...todos, newTodo]);
				setNewTodo("");
				setNewTodoDescription("");
			} else {
				console.error("Failed to create todo.");
			}
		} catch (error) {
			console.error("Error creating todo:", error);
		}
	};

	const handleEditTitleChange = (e) => {
		setEditedTitle(e.target.value);
	};

	const handleEditDescriptionChange = (e) => {
		setEditedDescription(e.target.value);
	};

	const handleUpdateTodo = async (todoId) => {
		const todoToUpdate = todos.find((todo) => todo._id === todoId);

		if (!todoToUpdate) {
			console.error("Todo not found for update.");
			return;
		}

		try {
			const response = await updateTodo(todoId, {
				title: editedTitle,
				description: editedDescription,
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

			if (response === true) {
				const updatedTodos = todos.filter((todo) => todo._id !== todoId);
				setTodos(updatedTodos);
				setEditingTodoId(null);
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

	// @ image
	useEffect(() => {
		if (isAuthenticated) {
			getUserProfileImage()
				.then((profileImage) => {
					if (profileImage) {
						setUserImage(profileImage);
					}
				})
				.catch((error) => {
					console.error("Error loading user image:", error);
				});
		}
	}, [isAuthenticated]);
	const handleImageChange = async (e) => {
		const fileInput = e.target; // Get the file input element
		const selectedFile = e.target.files[0];

		if (selectedFile) {
			if (!selectedFile.type.startsWith("image/")) {
				alert("Please select an image file.");
				fileInput.value = ""; // Clear the file input field
				return; // Exit the function to prevent further processing
			}

			const imageURL = URL.createObjectURL(selectedFile);
			setUserImage(imageURL);

			if (isAuthenticated) {
				try {
					const updatedImage = await updateUserImage(selectedFile);
					if (updatedImage) {
						setUserImage(updatedImage);
						console.log("User image updated successfully!");

						const profileImage = await getUserProfileImage();
						if (profileImage) {
							setUserImage(profileImage);
						}
					}
				} catch (error) {
					console.error("Error updating user image:", error);
				}
			}
		}
	};

	const openFileInput = () => {
		fileInputRef.current.click();
	};
	return (
		<Fragment>
			<UserLayout>
				<div className="dashboard">
					<div className="user-image" onClick={openFileInput}>
						<img src={userImage} alt="User" className="user-picture" />
						{isAuthenticated && (
							<label htmlFor="profileImage" className="update-button">
								Update
								<input
									type="file"
									name="profileImage"
									style={{ display: "none" }}
									onChange={handleImageChange}
									ref={fileInputRef}
								/>
							</label>
						)}
					</div>
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
							<button type="submit">Add</button>
						</form>

						<ul>
							{todos.map((todo) => (
								<li key={todo._id}>
									{editingTodoId === todo._id ? (
										<div>
											<input
												type="text"
												value={editedTitle}
												onChange={handleEditTitleChange}
												placeholder="Title"
											/>
											<input
												type="text"
												value={editedDescription}
												onChange={handleEditDescriptionChange}
												placeholder="Description"
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
											<span>Title: {todo.title}</span>
											<span>Description: {todo.description}</span>
											<span>Author: {todo.author}</span>
											<span>Created At: {formatDate(todo.createdAt)}</span>
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
