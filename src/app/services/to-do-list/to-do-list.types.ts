export type TaskItemStatus = 'InProgress' | 'Completed';

export type TaskItem = {
  id: string;
  text: string;
  description: string;
  status: TaskItemStatus;
};

export type TaskItems = TaskItem[];
