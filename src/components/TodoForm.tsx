import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { TodoFormData } from '../types/todo';

interface TodoFormProps {
  initialData?: TodoFormData;
  onSubmit: (data: TodoFormData) => void;
  onCancel: () => void;
}

const ASSIGNEES = [
  'John Doe',
  'Jane Smith',
  'Mike Johnson',
  'Sarah Williams',
  'David Brown',
];

export const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TodoFormData>(
    initialData || {
      title: '',
      description: '',
      assignee: '',
    }
  );
  const [errors, setErrors] = useState<Partial<TodoFormData>>({});

  const validateStep1 = () => {
    const newErrors: Partial<TodoFormData> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<TodoFormData> = {};
    if (!formData.assignee) {
      newErrors.assignee = 'Assignee is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      onSubmit(formData);
    }
  };

  const filteredAssignees = ASSIGNEES.filter((assignee) =>
    assignee.toLowerCase().includes(formData.assignee.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assignee
            </label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) =>
                setFormData({ ...formData, assignee: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Search assignee..."
            />
            {errors.assignee && (
              <p className="mt-1 text-sm text-red-600">{errors.assignee}</p>
            )}
            {formData.assignee && (
              <ul className="mt-2 max-h-40 overflow-auto rounded-md border border-gray-200">
                {filteredAssignees.map((assignee) => (
                  <li
                    key={assignee}
                    onClick={() =>
                      setFormData({ ...formData, assignee: assignee })
                    }
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {assignee}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <button
              type="submit"
              className="flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Submit
              <Check className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};