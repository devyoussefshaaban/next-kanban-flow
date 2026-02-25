import { create } from "zustand"
import { Task, Column, TaskPriority } from "@/features/kanban/types/Task"

interface TaskState {
    tasks: Task[]

    addTask: (task: Omit<Task, 'id'>) => void
    removeTask: (taskId: string) => void
    updateTask: (task: Pick<Task, 'id'>, updatedTask: Omit<Task, 'id'>) => void
    getTaskById: (taskId: Task["id"]) => Task | undefined

    moveTask: (task: Task, newColumn: Column) => void;
    changeTaskPriority: (task: Task, newPriority: TaskPriority) => void;
    clearAllTasks: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: [],

    addTask: (task) => set((state) => ({ tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }] })),
    removeTask: (taskId) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== taskId) })),
    updateTask: (task, updatedTask) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, ...updatedTask } : t)) })),
    getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),

    moveTask: (task, newColumn) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, column: newColumn } : t)) })),
    changeTaskPriority: (task, newPriority) => set((state) => ({ tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, priority: newPriority } : t)) })),
    clearAllTasks: () => set(() => ({ tasks: [] })),
}))