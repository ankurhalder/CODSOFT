const getAuthToken = () => {
	return localStorage.getItem("authToken");
};

const createTodo = async (newTodo) => {
	const token = getAuthToken();
	try {
		console.log("Create Todo function called");
		const response = await fetch("https://mytoodle.onrender.com/api/v1/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newTodo),
		});

		if (!response.ok) {
			throw new Error("Failed to create todo.");
		}
		console.log("data", response.json());
		return response.json();
	} catch (error) {
		console.log("Error:", error);
		throw error;
	}
};

const fetchTodos = async () => {
	const token = getAuthToken();
	try {
		console.log("Fetch Todos function called");
		const response = await fetch("https://mytoodle.onrender.com/api/v1/todos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch todos.");
		}
		console.log("data", response.json());
		return response.json();
	} catch (error) {
		console.log("Error:", error);
		throw error;
	}
};

const updateTodo = async (todoId, updatedTodo) => {
	const token = getAuthToken();
	try {
		console.log("Update Todo function called");
		const response = await fetch(
			`https://mytoodle.onrender.com/api/v1/todos/${todoId}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedTodo),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to update todo.");
		}
		console.log("data", response.json());
		return response.json();
	} catch (error) {
		console.log("Error:", error);
		throw error;
	}
};

const deleteTodo = async (todoId) => {
	const token = getAuthToken();
	try {
		console.log("Delete Todo function called");
		const response = await fetch(
			`https://mytoodle.onrender.com/api/v1/todos/${todoId}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to delete todo.");
		}
		console.log("data", response.json());
	} catch (error) {
		console.log("Error:", error);
		throw error;
	}
};

export { createTodo, fetchTodos, updateTodo, deleteTodo };