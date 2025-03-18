import type { Task as TaskItem } from '@/types';
import { Button } from './button';
import { useTasks } from '@/contexts/task-context';
import { useToggle } from '@/utilities/use-toggle';
import { TaskForm } from './task-form';

export const Task = (task: TaskItem) => {
  const { deleteTask } = useTasks();
  const [editing, toggleEditing] = useToggle();

  return (
    <li
      id={`task-${task.id}`}
      className="p-4 space-y-4 rounded bg-slate-50 outline-none transition-colors duration-200 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
      tabIndex={0}
      aria-labelledby={`task-title-${task.id}`}
      role="article"
    >
      <article
        className="flex justify-between"
        onKeyDown={(e) => {
          // Allow Delete key to remove the task
          if (e.key === 'Delete') {
            deleteTask(task.id);
          }
        }}
      >
        <div>
          <h3
            id={`task-title-${task.id}`}
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={toggleEditing} aria-label={`Edit task: ${task.title}`}>
            {editing ? 'Cancel' : 'Edit'}
          </Button>
          <Button
            variant="destructive"
            aria-label={`Delete task: ${task.title}`}
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </Button>
        </div>
      </article>
      {editing && <TaskForm task={task} onSubmit={toggleEditing} />}
    </li>
  );
};
