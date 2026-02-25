"use client"

import { Column as ColumnComponent } from "@/features/kanban/components/Column";
import { Column, Task } from "@/features/kanban/types/Task";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/api";
import { Box, Grid, Skeleton } from "@mui/material";

export default function KanbanPage() {

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    })

    if (isLoading) {
        return <Grid container spacing={2}>
            {Array.from(new Array(4)).map((_, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                    <Box key={index} sx={{ width: 300, marginRight: 0.5, my: 5 }}>
                        <Skeleton variant="rectangular" sx={{ width: "100%", height: 300 }} />
                    </Box>
                </Grid>
            ))}
        </Grid>
    }

    if (error) {
        return <div>Error: Some error occured while fetching tasks</div>
    }

    const getColumnTasks = (column: Column) => {
        return tasks?.filter((task: Task) => task.column === column) || [];
    }

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <ColumnComponent
                    column={Column.Backlog}
                    title="Backlog"
                    tasks={getColumnTasks(Column.Backlog)}
                />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <ColumnComponent
                    column={Column.InProgress}
                    title="In Progress"
                    tasks={getColumnTasks(Column.InProgress)}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <ColumnComponent
                    column={Column.Review}
                    title="Review"
                    tasks={getColumnTasks(Column.Review)}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                <ColumnComponent
                    column={Column.Done}
                    title="Done"
                    tasks={getColumnTasks(Column.Done)}
                />
            </Grid>
        </Grid>
    )
}