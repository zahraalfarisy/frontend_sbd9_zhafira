import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Custom icon components to replace lucide-react
const Leaf = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 4 13C4 6 11 1 11 1c0 0 7 5 7 12a7 7 0 0 1-7 7Z" />
    <path d="M11 20a3 3 0 0 0 3-3" />
  </svg>
);

const Plus = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Trash2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

const Check = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Info = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const X = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const Sun = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const Home = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const Settings = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Color palette
const colorClasses = {
  primary: 'bg-green-800', // Forest green
  primaryText: 'text-green-800',
  primaryHover: 'hover:bg-green-900',
  primaryBorder: 'border-green-800',
  secondary: 'bg-green-400', // Light green
  secondaryText: 'text-green-400',
  secondaryHover: 'hover:bg-green-500',
  accent: 'bg-green-500', // Medium green
  accentText: 'text-green-500',
  light: 'bg-green-50', // Very light green
  lightHover: 'hover:bg-green-100',
  dark: 'bg-green-900', // Dark green
  darkText: 'text-green-900',
  white: 'bg-white',
  whiteText: 'text-white',
  gray: 'bg-gray-100',
  textDark: 'text-gray-800',
  textLight: 'text-gray-500'
};

// Mock data for initial tasks
const initialTasks = [
  { id: 1, title: 'Water the plants', description: 'Indoor plants need water twice a week', completed: false, priority: 'high', dueDate: '2025-05-08', category: 'Home' },
  { id: 2, title: 'Read gardening book', description: 'Chapter 3: Soil types', completed: true, priority: 'medium', dueDate: '2025-05-05', category: 'Learning' },
  { id: 3, title: 'Buy new plant pots', description: 'Need 3 medium size terracotta pots', completed: false, priority: 'low', dueDate: '2025-05-10', category: 'Shopping' }
];

// Components
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = 'font-medium rounded-lg py-2 px-4 transition-colors focus:outline-none';
  const variants = {
    primary: `${disabled ? 'bg-gray-300' : 'bg-green-800'} text-white hover:bg-green-900`,
    secondary: 'bg-green-400 text-white hover:bg-green-500',
    outline: 'border border-green-800 text-green-800 hover:bg-green-50',
    text: 'text-green-800 hover:bg-green-50'
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = 'default' }) => {
  const types = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-500 text-white',
    primary: 'bg-green-800 text-white',
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-green-400 text-white'
  };
  
  return (
    <span className={`inline-block rounded-full text-xs px-2 py-1 font-medium ${types[type]}`}>
      {children}
    </span>
  );
};

const TextField = ({ label, value, onChange, placeholder, type = 'text', className = '', required = false }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder, className = '', required = false }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24"
    />
  </div>
);

const Select = ({ label, value, onChange, options, className = '', required = false }) => (
  <div className={`mb-4 ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Task component
const TaskItem = ({ task, onComplete, onDelete, onView }) => {
  const growthStages = ['🌱', '🌿', '🌳'];
  const growthStage = task.completed ? 2 : 0;
  
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow border-l-4 border-green-500">
      <div className="flex items-start">
        <div className="mr-4 text-2xl cursor-pointer" onClick={() => onComplete(task.id)}>
          {growthStages[growthStage]}
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-1">
            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <Badge type={task.priority} className="ml-2">
              {task.priority}
            </Badge>
            {task.category && (
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 rounded-md px-2 py-1">
                {task.category}
              </span>
            )}
          </div>
          {task.dueDate && (
            <div className="text-xs text-gray-600 mb-1">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          <p className="text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(task.id)}
            className="text-gray-500 hover:text-blue-500"
            aria-label="View task"
          >
            <Info size={18} />
          </button>
          <button
            onClick={() => onComplete(task.id)}
            className={`hover:${colorClasses.accentText}`}
            aria-label="Mark as completed"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-500"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </Card>
  );
};

// Empty state component
const EmptyState = ({ message, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="text-5xl mb-4">🌱</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
    <p className="text-gray-500 mb-6 max-w-sm">Plant your first task and watch your garden grow!</p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Add after line 426 (after the Modal component and before the Homepage component)
// API Service functions
const TaskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
  
  getTaskById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },
  
  createTask: async (taskData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/tasks", taskData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
  
  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },
  
  toggleTaskCompletion: async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/tasks/${id}/toggle`);
      return response.data.data;
    } catch (error) {
      console.error(`Error toggling task ${id}:`, error);
      throw error;
    }
  },
  
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },
  
  getTaskStats: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks/stats/summary");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching task stats:", error);
      throw error;
    }
  }
};

const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/categories");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  
  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/categories/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching category ${id}:`, error);
      throw error;
    }
  },
  
  createCategory: async (categoryData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/categories", categoryData);
      return response.data.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },
  
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/categories/${id}`, categoryData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating category ${id}:`, error);
      throw error;
    }
  },
  
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting category ${id}:`, error);
      throw error;
    }
  }
};

const HealthService = {
  checkHealth: async () => {
    try {
      const response = await axios.get("http://localhost:3000/health");
      return response.data;
    } catch (error) {
      console.error("Error checking API health:", error);
      throw error;
    }
  }
};

// Page Components
const Homepage = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToView, setTaskToView] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: ''
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tasksData, statsData] = await Promise.all([
          TaskService.getAllTasks(),
          TaskService.getTaskStats()
        ]);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Filter tasks based on completion status and search query
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'active' && task.completed) return false;
    
    // Search by title or description
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Task actions
  const completeTask = async (id) => {
    try {
      const updatedTask = await TaskService.toggleTaskCompletion(id);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error(`Failed to toggle task completion:`, error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(`Failed to delete task:`, error);
    }
  };

  const viewTask = async (id) => {
    try {
      const task = await TaskService.getTaskById(id);
      setTaskToView(task);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Failed to fetch task details:`, error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await CategoryService.getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addTask = async () => {
    if (!newTask.title.trim()) return;

    const taskData = {
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      category: newTask.category
    };

    try {
      const createdTask = await TaskService.createTask(taskData);
      setTasks([...tasks, createdTask]);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: ''
      });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

    return (
      <div className="max-w-4xl mx-auto pb-16">
        {/* Header */}
        <div className="bg-green-800 text-white p-6 rounded-b-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Leaf className="mr-2" size={24} />
              <h1 className="text-xl font-bold">Todo Garden</h1>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center"
            >
              <Plus size={18} className="mr-1" /> New Task
            </Button>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between bg-white bg-opacity-10 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTasks}</div>
              <div className="text-xs">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-xs">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-xs">Completion</div>
            </div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="flex items-center justify-between my-4 px-4">
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-green-800 text-white' : 'bg-gray-100'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-green-800 text-white' : 'bg-gray-100'}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-green-800 text-white' : 'bg-gray-100'}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Task List */}
        <div className="px-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={completeTask}
                onDelete={deleteTask}
                onView={viewTask}
              />
            ))
          ) : (
            <EmptyState
              message={searchQuery ? "No matching tasks found" : "Your garden is empty"}
              actionLabel={searchQuery ? "Clear search" : "Plant a new task"}
              onAction={searchQuery ? () => setSearchQuery('') : () => setIsAddModalOpen(true)}
            />
          )}
        </div>
        
        {/* View Task Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title="Task Details"
        >
          {taskToView && (
            <div>
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold flex-grow">{taskToView.title}</h3>
                <Badge type={taskToView.priority}>{taskToView.priority}</Badge>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Description</div>
                <p className="text-gray-800">{taskToView.description || "No description"}</p>
              </div>
              
              {taskToView.dueDate && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Due Date</div>
                  <p className="text-gray-800">{new Date(taskToView.dueDate).toLocaleDateString()}</p>
                </div>
              )}
              
              {taskToView.category && (
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-1">Category</div>
                  <p className="text-gray-800">{taskToView.category}</p>
                </div>
              )}
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <p className="text-gray-800">{taskToView.completed ? "Completed" : "Active"}</p>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => deleteTask(taskToView.id)}
                  className="flex items-center"
                >
                  <Trash2 size={16} className="mr-1" /> Delete
                </Button>
                <Button 
                  onClick={() => {
                    completeTask(taskToView.id);
                    setIsModalOpen(false);
                  }}
                  className="flex items-center"
                >
                  <Check size={16} className="mr-1" /> 
                  {taskToView.completed ? "Mark as Incomplete" : "Mark as Complete"}
                </Button>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Add Task Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Plant a New Task"
        >
          <div>
            <TextField
              label="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              placeholder="Enter task title"
              required
            />
            
            <TextArea
              label="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              placeholder="Enter task description"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Priority"
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
              />
              
              <TextField
                label="Due Date"
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
            </div>
            
            {categories && categories.length > 0 ? (
      <Select
        label="Category"
        value={newTask.category}
        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
        options={[
          { value: '', label: 'Select a category' },
          ...categories.map(category => ({ 
            value: category.id, 
            label: category.name 
          }))
        ]}
      />
    ) : (
      <TextField
        label="Category"
        value={newTask.category}
        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
        placeholder="E.g. Work, Home, Personal"
      />
    )}
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={addTask}
                disabled={!newTask.title.trim()}
              >
                Plant Task
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // Task actions
 
const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className={`text-2xl font-bold mb-6 ${colorClasses.primaryText}`}>About Todo Garden</h1>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">What is Todo Garden?</h2>
        <p className="mb-4">
          Todo Garden is a task management application with a plant-themed approach. 
          Instead of traditional checkboxes, your tasks are represented as plants that grow 
          as you complete them. This creates a visual metaphor where your productivity 
          cultivates a thriving digital garden.
        </p>
        <p>
          The app is designed to make task management more engaging and visually rewarding, 
          encouraging you to nurture your productivity one task at a time.
        </p>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create, view, complete, and delete tasks</li>
          <li>Visual plant growth representation for task completion</li>
          <li>Priority levels and categorization for better organization</li>
          <li>Task filtering and search functionality</li>
          <li>Progress tracking and completion statistics</li>
          <li>Clean, intuitive user interface with a calming green aesthetic</li>
        </ul>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <div className="space-y-4">
          <div>
          <h3 className={`font-medium mb-2 ${colorClasses.accentText}`}>1. Plant a New Task</h3>
            <p>Click the "New Task" button to add a task to your garden. Fill in the details including title, description, priority, due date, and category.</p>
          </div>
          <div>
          <h3 className={`font-medium mb-2 ${colorClasses.accentText}`}>2. Watch Your Tasks Grow</h3>
            <p>As you complete tasks, the plant icons will grow from seedlings to fully-grown plants, providing a visual representation of your progress.</p>
          </div>
          <div>
          <h3 className={`font-medium mb-2 ${colorClasses.accentText}`}>3. Manage Your Garden</h3>
            <p>Use the filters to view all tasks, active tasks, or completed tasks. Use the search functionality to find specific tasks by title, description, or category.</p>
          </div>
          <div>
          <h3 className={`font-medium mb-2 ${colorClasses.accentText}`}>4. Harvest Your Success</h3>
            <p>Track your completion rate and celebrate your productivity as your digital garden flourishes!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className={`text-2xl font-bold mb-6 ${colorClasses.primaryText}`}>Settings</h1>
      
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <TextField
            label="Display Name"
            value="Garden Enthusiast"
            onChange={() => {}}
            placeholder="Enter your name"
          />
          
          <TextField
            label="Email Address"
            value="user@example.com"
            onChange={() => {}}
            placeholder="Enter your email"
            type="email"
          />
          
          <Button className="w-full">Save Changes</Button>
        </div>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">Enable task reminders and notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-800"></div>
            </label>
          </div>
          
          <Select
            label="Default Task View"
            value="all"
            onChange={() => {}}
            options={[
              { value: 'all', label: 'All Tasks' },
              { value: 'active', label: 'Active Tasks' },
              { value: 'completed', label: 'Completed Tasks' }
            ]}
          />
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-semibold mb-4">Data Management</h2>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">Export Data</Button>
          <Button variant="outline" className="w-full">Import Data</Button>
          <Button variant="outline" className="w-full text-red-500 hover:bg-red-50">Clear All Tasks</Button>
        </div>
      </Card>
    </div>
  );
};

// Layout component with navigation
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Top Navigation */}
      <nav className={`${colorClasses.primary} text-white shadow-md`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Leaf size={24} />
              <span className="ml-2 font-semibold text-lg">Todo Garden</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">
                Settings
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="pt-6 pb-12">
        {children}
      </main>
      
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Info size={20} />
            <span className="text-xs mt-1">About</span>
          </a>
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Settings size={20} />
            <span className="text-xs mt-1">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {

  return (
    <div className={`min-h-screen ${colorClasses.light}`}>
      {/* Top Navigation */}
      <nav className={`${colorClasses.primary} text-white shadow-md`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Leaf size={24} />
              <span className="ml-2 font-semibold text-lg">Todo Garden</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#" className="hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="pt-6 pb-12">
        <Homepage />
      </main>


      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Info size={20} />
            <span className="text-xs mt-1">About</span>
          </a>
          <a href="#" className="flex flex-col items-center p-3 hover:bg-gray-100">
            <Settings size={20} />
            <span className="text-xs mt-1">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;