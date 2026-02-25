"use client"

import { Column as ColumnComponent } from "@/features/kanban/components/Column";
import { Column, Task } from "@/features/kanban/types/Task";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/api";

export default function KanbanPage() {

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: Some error occured while fetching tasks</div>
    }

    const getColumnTasks = (column: Column) => {
        return tasks?.filter((task: Task) => task.column === column) || [];
    }

    return (
        <div className="flex gap-4">
            <ColumnComponent
                column={Column.Backlog}
                title="Backlog"
                tasks={getColumnTasks(Column.Backlog)}
            />
            <ColumnComponent
                column={Column.InProgress}
                title="In Progress"
                tasks={getColumnTasks(Column.InProgress)}
            />
            <ColumnComponent
                column={Column.Review}
                title="Review"
                tasks={getColumnTasks(Column.Review)}
            />
            <ColumnComponent
                column={Column.Done}
                title="Done"
                tasks={getColumnTasks(Column.Done)}
            />
        </div>
    )
}