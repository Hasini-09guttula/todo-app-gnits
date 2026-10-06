const API_URL = "api/todos";

const request = async (url, options) => {
  const res = await fetch(url, options);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  
  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }
  return data;
};

// GET all todos
export const getTodos = () => request(API_URL);

// POST a new todo (accepts either a string title or a full todo object)
export const createTodo = (todoData) => {
  const body = typeof todoData === "string" ? { title: todoData } : todoData;
  return request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

// PUT to update a todo
export const updateTodo = (id, data) =>
  request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// DELETE a todo
export const deleteTodo = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });