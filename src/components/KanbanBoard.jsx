import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';

const COLUMNS = [
  { id: 'backlog', title: 'Backlog', bgColor: 'bg-gray-100', headerColor: 'bg-gray-200' },
  { id: 'in-progress', title: 'In Progress', bgColor: 'bg-blue-50', headerColor: 'bg-blue-200' },
  { id: 'blocked', title: 'Blocked', bgColor: 'bg-red-50', headerColor: 'bg-red-200' },
  { id: 'done', title: 'Done', bgColor: 'bg-green-50', headerColor: 'bg-green-200' },
];

export function KanbanBoard({ getTasksByStatus, onAdd, onEdit, onDelete, onStatusChange }) {
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTask(active.data.current?.task || null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    if (COLUMNS.some((col) => col.id === newStatus)) {
      onStatusChange(taskId, newStatus);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onAdd}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Task
        </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-4 gap-4">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
