export enum Column {
    Backlog = 'backlog',
    InProgress = 'in_progress',
    Review = 'review',
    Done = 'done'
}

export enum TaskPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export interface Task {
    id: string;
    title: string;
    description: string;
    column: Column;
    priority: TaskPriority;
}