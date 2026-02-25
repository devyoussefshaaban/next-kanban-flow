"use client"

import { Column as ColumnComponent } from "@/features/kanban/components/Column";
import { Column, Task } from "@/features/kanban/types/Task";
import { fetchTasks, addTask, updateTask, removeTask } from "@/lib/api";
import { Box, Grid, Skeleton } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropProvider, PointerSensor } from "@dnd-kit/react";

export default function KanbanPage() {

    const queryClient = useQueryClient();

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    })

    const addTaskMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: removeTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    if (isLoading) {
        return <Grid container spacing={2}>
            {Array.from(new Array(4)).map((_, index) => (
                <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                    <Box sx={{ width: '100%', my: 2 }}>
                        <Skeleton variant="rectangular" sx={{ width: "100%", height: 300, borderRadius: 2 }} />
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

    const handleAddTask = (column: Column, taskData: any) => {
        addTaskMutation.mutate({ ...taskData, column });
    }

    const handleDragEnd = (event: any) => {
        const { operation, canceled } = event;

        if (canceled || !operation.target) return;

        const sourceTask = operation.source.data as Task;
        const targetData = operation.target.data;

        // The target could be a Column (data: { column }) or another TaskCard (data: task)
        const targetColumn = targetData.column;

        if (targetColumn && sourceTask.column !== targetColumn) {
            updateTaskMutation.mutate({
                ...sourceTask,
                column: targetColumn
            });
        }
    };

    const sensors = [PointerSensor];

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Grid container spacing={2} alignItems="flex-start">
                {Object.values(Column).map((column) => (
                    <Grid size={{ xs: 12, md: 6, lg: 3 }} key={column}>
                        <ColumnComponent
                            column={column}
                            title={column.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            tasks={getColumnTasks(column)}
                            onAddTask={() => { }}
                            onUpdateTask={(task: Task) => updateTaskMutation.mutate(task)}
                            onDeleteTask={(taskId: string) => deleteTaskMutation.mutate(taskId)}
                            onCreateTask={(data: any) => addTaskMutation.mutate(data)}
                        />
                    </Grid>
                ))}
            </Grid>
        </DragDropProvider>
    )
}