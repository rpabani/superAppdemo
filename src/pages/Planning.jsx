import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { KanbanBoard } from '../components/KanbanBoard';
import { TaskForm } from '../components/TaskForm';

export default function Planning() {
  const { addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAdd = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleSave = (formData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Planning</h1>

      <KanbanBoard
        getTasksByStatus={getTasksByStatus}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={moveTask}
      />

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
