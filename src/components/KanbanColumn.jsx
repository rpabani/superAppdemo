import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';

export function KanbanColumn({ column, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${column.bgColor} rounded-lg p-4 min-h-[400px] transition-colors ${
        isOver ? 'ring-2 ring-blue-400 ring-inset' : ''
      }`}
    >
      <div className={`${column.headerColor} rounded-lg px-3 py-2 mb-4`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-700">{column.title}</h3>
          <span className="text-sm text-gray-500 bg-white bg-opacity-50 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
