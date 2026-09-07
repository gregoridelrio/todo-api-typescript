export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}