import React, { useState } from 'react';
import { Plus, CheckCircle, ListTodo } from 'lucide-react';
import { TodoList } from '../components/TodoList';
import { TodoForm } from '../components/TodoForm';
import { useTodo } from '../context/TodoContext';

export const TodoPage: React.FC = () => {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const { addTodo, getTodoStats } = useTodo();
  const stats = getTodoStats();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
          <button
            onClick={() => setIsAddingTodo(true)}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add Todo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center">
              <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
              <h2 className="text-lg font-semibold text-green-900">
                Completed Tasks
              </h2>
            </div>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {stats.completed}
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-center">
              <ListTodo className="mr-3 h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-900">Total Tasks</h2>
            </div>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {stats.total}
            </p>
          </div>
        </div>
      </div>

      {isAddingTodo ? (
        <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Add New Todo</h2>
          <TodoForm
            onSubmit={(data) => {
              addTodo(data);
              setIsAddingTodo(false);
            }}
            onCancel={() => setIsAddingTodo(false)}
          />
        </div>
      ) : null}

      <TodoList />
    </div>
  );
};