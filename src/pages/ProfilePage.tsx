import React from 'react';
import { User, CheckCircle, ListTodo } from 'lucide-react';
import { useTodo } from '../context/TodoContext';

export const ProfilePage: React.FC = () => {
  const { getTodoStats } = useTodo();
  const stats = getTodoStats();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center">
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Task Manager</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Task Completion Rate
          </h2>
          <div className="h-4 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-green-600 transition-all duration-500"
              style={{
                width: `${
                  stats.total > 0
                    ? Math.round((stats.completed / stats.total) * 100)
                    : 0
                }%`,
              }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {stats.total > 0
              ? `${Math.round((stats.completed / stats.total) * 100)}% of tasks completed`
              : 'No tasks yet'}
          </p>
        </div>
      </div>
    </div>
  );
};