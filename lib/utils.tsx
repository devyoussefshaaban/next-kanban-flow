import { z } from "zod"
import { Column, TaskPriority } from "@/features/kanban/types/Task"

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    column: z.nativeEnum(Column, {
        error: () => ({ message: 'Please select a valid column' })
    }),
    priority: z.nativeEnum(TaskPriority, {
        error: () => ({ message: 'Please select a valid priority' })
    })
});

export type TaskFormData = z.infer<typeof taskSchema>;