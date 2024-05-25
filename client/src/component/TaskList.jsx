import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from 'react-icons/ai';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Today's Task List</h1>
      <div className="flex justify-end mb-4">
        <Link 
          to="/task/new" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <AiOutlinePlus className="mr-2" />
          Create Task
        </Link>
      </div>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task._id} className="p-4 bg-white bg-opacity-80 rounded shadow hover:bg-opacity-100 transition duration-300 ease-in-out transform hover:scale-105">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                <p className="text-gray-600">{task.status} - {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <Link 
                  to={`/task/edit/${task._id}`} 
                  className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  <AiFillEdit size={24} />
                </Link>
                <button 
                  onClick={() => deleteTask(task._id)} 
                  className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out transform hover:scale-110"
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
