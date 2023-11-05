import React, { useState, useEffect, Fragment, useRef } from "react";
import { UserLayout } from "../layout";
import {
	createTodo,
	fetchTodos,
	updateTodo,
	deleteTodo,
} from "../functions/todoServices";
import { updateUserImage, getUserProfileImage } from "../functions/userImage";
import RandomLoader from "../components/RandomLoader";
function formatDate(dateStr) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};
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
	const [loading, setIsLoading] = useState(false);
	const fileInputRef = useRef(null);
	const isAuthenticated = localStorage.getItem("authToken");
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) {
			window.location.href = "/";
		}
	}, []);

	useEffect(() => {
		setIsLoading(true);
		fetchTodos()
			.then((data) => setTodos(data.data.todos))
			.then(() => setIsLoading(false))
			.catch((error) => console.error("Error fetching todos:", error));
	}, []);

	const handleCreateTodo = async (e) => {
		e.preventDefault();
		setIsLoading(true);
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
				alert("Todo created successfully!");
				setIsLoading(false);
			} else {
				console.error("Failed to create todo.");
				alert("Failed to create todo.");
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error creating todo:", error);
			alert("Error creating todo.");
			setIsLoading(false);
		}
	};

	const handleEditTitleChange = (e) => {
		setEditedTitle(e.target.value);
	};

	const handleEditDescriptionChange = (e) => {
		setEditedDescription(e.target.value);
	};

	const handleUpdateTodo = async (todoId) => {
		setIsLoading(true);
		const todoToUpdate = todos.find((todo) => todo._id === todoId);
		if (!todoToUpdate) {
			console.error("Todo not found for update.");
			alert("Todo not found for update.");
			setIsLoading(false);
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
				setIsLoading(false);
				alert("Todo updated successfully!");
			} else {
				console.error("Failed to update todo.");
				alert("Failed to update todo.");
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error updating todo:", error);
			alert("Error updating todo.");
			setIsLoading(false);
		}
	};

	const handleDeleteTodo = async (todoId) => {
		try {
			setIsLoading(true);
			const response = await deleteTodo(todoId);

			if (response === true) {
				const updatedTodos = todos.filter((todo) => todo._id !== todoId);
				setTodos(updatedTodos);
				setEditingTodoId(null);
				alert("Todo deleted successfully!");
				setIsLoading(false);
			} else {
				console.error("Failed to delete todo.");
				alert("Failed to delete todo.");
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Error deleting todo:", error);
			alert("Error deleting todo.");
			setIsLoading(false);
		}
	};

	const email = localStorage.getItem("email");
	const firstName = localStorage.getItem("firstName");
	const lastName = localStorage.getItem("lastName");

	// @ image
	useEffect(() => {
		if (isAuthenticated) {
			setIsLoading(true);
			getUserProfileImage()
				.then((profileImage) => {
					if (profileImage) {
						setUserImage(profileImage);
					}
				})
				.then(() => setIsLoading(false))
				.catch((error) => {
					console.error("Error loading user image:", error);
					alert("Error loading user image.");
					setIsLoading(false);
				});
		}
	}, [isAuthenticated]);
	const handleImageChange = async (e) => {
		const fileInput = e.target;
		const selectedFile = e.target.files[0];
		setIsLoading(true);
		if (selectedFile) {
			if (!selectedFile.type.startsWith("image/")) {
				alert("Please select an image file.");
				fileInput.value = "";
				setIsLoading(false);
				return;
			}

			const imageURL = URL.createObjectURL(selectedFile);
			setUserImage(imageURL);

			if (isAuthenticated) {
				try {
					const updatedImage = await updateUserImage(selectedFile);
					if (updatedImage) {
						setUserImage(updatedImage);
						console.log("User image updated successfully!");
						alert("User image updated successfully!");
						setIsLoading(false);
						const profileImage = await getUserProfileImage();
						if (profileImage) {
							setUserImage(profileImage);
						}
					}
				} catch (error) {
					console.error("Error updating user image:", error);
					alert("Error updating user image.");
					setIsLoading(false);
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
				{loading && <RandomLoader />}
				<div className="dashboard">
					<div className="user-image">
						<img src={userImage} alt="User" className="user-picture" />
						<label
							htmlFor="profileImage"
							className="update-button"
							onClick={openFileInput}
						>
							Update
							<input
								type="file"
								name="profileImage"
								style={{ display: "none" }}
								onChange={handleImageChange}
								ref={fileInputRef}
							/>
						</label>
					</div>
					<div className="user-greeting">
						<h1 className="heading">welcome, {firstName + " " + lastName}</h1>
						<span className="user-email">email: {email}</span>
					</div>
					<div>
						<h2 className="todo-list-title">Todo List</h2>
						<form onSubmit={handleCreateTodo}>
							<input
								type="text"
								className="new-todo-input"
								placeholder="Title"
								value={newTodo}
								onChange={(e) => setNewTodo(e.target.value)}
								required
							/>
							<textarea
								className="description-input"
								placeholder="Description"
								value={newTodoDescription}
								onChange={(e) => setNewTodoDescription(e.target.value)}
								rows={5}
								cols={50}
							/>
							<button type="submit" className="add-button">
								Add
							</button>
						</form>

						<ul className="todo-list">
							{todos.map((todo) => (
								<li key={todo._id} className="todo-item">
									{editingTodoId === todo._id ? (
										<div>
											<input
												type="text"
												value={editedTitle}
												onChange={handleEditTitleChange}
												placeholder="Title"
												className="edit-title-input"
											/>
											<input
												type="text"
												value={editedDescription}
												onChange={handleEditDescriptionChange}
												placeholder="Description"
												className="edit-description-input"
											/>
											<button
												onClick={() => handleUpdateTodo(todo._id)}
												className="save-button"
											>
												Save
											</button>
											<button
												onClick={() => setEditingTodoId(null)}
												className="cancel-button"
											>
												Cancel
											</button>
										</div>
									) : (
										<div>
											<span className="todo-title">Title: {todo.title}</span>
											<span className="todo-description">
												Description: {todo.description}
											</span>
											<span className="todo-author">Author: {todo.author}</span>
											<span className="todo-created-at">
												Created At: {formatDate(todo.createdAt)}
											</span>
											<button
												onClick={() => setEditingTodoId(todo._id)}
												className="edit-button"
											>
												Edit
											</button>
											<button
												onClick={() => handleDeleteTodo(todo._id)}
												className="delete-button"
											>
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
