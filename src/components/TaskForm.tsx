import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onAddTask: (
    title: string,
    description: string,
    assignedTo: string,
    priority: string,
    status: string,
    startDate: string,
    endDate: string
  ) => void;
  onClose: () => void;
}

const TaskForm: React.FC<Props> = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('P3');
  const [status, setStatus] = useState('Todo');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return; // Validação: título não pode ser vazio
    onAddTask(title, description, assignedTo, priority, status, startDate, endDate);
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setPriority('P3');
    setStatus('Todo');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-4xl w-full flex relative">
      {/* Botão Fechar */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {/* Área de Texto */}
      <div className="flex-1 pr-6">
        <h2 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
          Task Details
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Description (Markdown)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter task description"
              rows={8}
            />
          </div>
        </div>
      </div>

      {/* Controles Laterais */}
      <div className="w-80 bg-gray-800 p-6 rounded-lg shadow-inner flex flex-col space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Assign To</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Assign to (e.g., John Doe)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="P1">P1 - High</option>
            <option value="P2">P2 - Medium</option>
            <option value="P3">P3 - Low</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-gray-300 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
