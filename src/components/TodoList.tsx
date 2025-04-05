import React, { useState } from 'react';
import { Check, Edit, Trash2 } from 'lucide-react';
import { useTodo } from '../context/TodoContext';
import { TodoForm } from './TodoForm';
import { Todo } from '../types/todo';

export const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo, editTodo } = useTodo();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setDeleteConfirmation(null);
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`rounded-lg border p-4 shadow-sm ${
            todo.completed ? 'bg-gray-50' : 'bg-white'
          }`}
        >
          {editingTodo?.id === todo.id ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Todo</h3>
              <TodoForm
                initialData={{
                  title: todo.title,
                  description: todo.description,
                  assignee: todo.assignee,
                }}
                onSubmit={(data) => {
                  editTodo(todo.id, data);
                  setEditingTodo(null);
                }}
                onCancel={() => setEditingTodo(null)}
              />
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${
                      todo.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {todo.description}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Assigned to: {todo.assignee}
                  </p>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  {!todo.completed && (
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="rounded p-1 text-gray-400 hover:text-gray-500"
                      title="Mark as completed"
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  )}
                  {todo.completed && (
                    <span className="rounded p-1 text-green-600" title="Completed">
                      <Check className="h-5 w-5" />
                    </span>
                  )}
                  {!todo.completed && (
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className="rounded p-1 text-blue-600 hover:text-blue-700"
                      title="Edit todo"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  )}
                  {!todo.completed && (
                    <button
                      onClick={() => setDeleteConfirmation(todo.id)}
                      className="rounded p-1 text-red-600 hover:text-red-700"
                      title="Delete todo"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {deleteConfirmation === todo.id && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">
                    Are you sure you want to delete this todo?
                  </p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => setDeleteConfirmation(null)}
                      className="rounded-md bg-white px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet. Add one!</p>
      )}
    </div>
  );
};