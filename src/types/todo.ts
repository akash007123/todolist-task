export interface Todo {
  id: string;
  title: string;
  description: string;
  assignee: string;
  completed: boolean;
  createdAt: string;
}

export interface TodoFormData {
  title: string;
  description: string;
  assignee: string;
}

export interface User {
  id: string;
  name: string;
}