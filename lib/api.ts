import { Task } from "@/features/kanban/types/Task";

const BASE_URL = 'http://localhost:3001';

export const fetchTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);
    return response.json();
}

export const addTask = async (task: Omit<Task, 'id'>) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
}

export const updateTask = async (task: Task) => {
    const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
}

export const removeTask = async (taskId: string) => {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    return response.json();
}