export interface Task {
  id: string;
  title: string;
  description?: string;
}

export type PartialTask = Partial<Omit<Task, 'id'>>;

export interface Error {
  message: string;
}
