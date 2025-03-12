import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Todo = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update Todo
        const response = await axios.put(
          `http://localhost:5005/todo/update/${editingId}`,
          todo,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        toast.success(response.data.message);
        setEditingId(null); // Clear editing state
      } else {
        // Add New Todo
        const response = await axios.post(
          "http://localhost:5005/todo/create",
          todo,
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        if(response.status === 200){
            toast.success(response.data.message);
        }
      }
      setTodo({ title: "", description: "" });
      getTodos();
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/login')
    }
  };

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5005/todo/");
      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (task) => {
    setTodo({ title: task.title, description: task.description });
    setEditingId(task._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/todo/delete/${id}`);
      toast.success("Task deleted successfully!");
      getTodos();
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
      {/* Form */}
      <form onSubmit={handleAddTodo} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        <input type="text" placeholder="Enter title" name="title" value={todo.title} onChange={handleChange} style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px", outline: "none" }} />
        <textarea placeholder="Enter description" name="description" value={todo.description} onChange={handleChange} rows="3" style={{ padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px", outline: "none", resize: "none" }} />
        <button style={{ backgroundColor: editingId ? "#ffc107" : "#28a745", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form><br />

      {/* Todo Table */}
      <div className="todo-container">
  <h3 className="todo-heading">Todo List</h3><br />
  {todos.length > 0 ? (
    <table className="todo-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => handleUpdate(task)} className="todo-btn update-btn">Update</button>
              <button onClick={() => handleDelete(task._id)} className="todo-btn delete-btn">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p style={{ textAlign: "center", color: "#777" }}>No tasks found</p>
  )}
</div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Todo;
