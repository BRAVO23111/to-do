import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSave } from "react-icons/ai";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const response = await axios.get(`https://to-do-2391.onrender.com/task/${id}`);
          setTask(response.data);
        }
      } catch (error) {
        console.error("Error fetching the task:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://to-do-2391.onrender.com/task/${id}`, task);
        alert("Task updated successfully");
      } else {
        await axios.post("https://to-do-2391.onrender.com/task", task);
        alert("Task created successfully");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving the task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">{id ? "Edit Task" : "Create Task"}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status:
          </label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        >
          <AiOutlineSave className="mr-2" />
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
