'use client';

import React from 'react';
import { Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Column as ColumnType, Task, TaskPriority } from '@/features/kanban/types/Task';
import TaskCard from './TaskCard';
import { useTaskStore } from '@/store/tasks.store';

interface ColumnProps {
    column: ColumnType;
    title: string;
    tasks: Task[];
    onAddTask?: (column: ColumnType) => void;
}

export const Column: React.FC<ColumnProps> = ({
    column,
    title,
    tasks,
    onAddTask,
}) => {
    const addTask = useTaskStore((state) => state.addTask);
    return (
        <Paper
            elevation={0}
            className="flex flex-col rounded-xl border border-gray-200 bg-gray-50"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-800">
                        {title}
                    </h2>
                    <span className="text-xs font-medium text-gray-500">
                        {tasks.length}
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {onAddTask && (
                        <IconButton
                            size="small"
                            onClick={() => addTask({
                                column,
                                title: '',
                                description: '',
                                priority: TaskPriority.Low,
                            })}
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    )}

                    <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 p-3 min-h-[120px]">
                {tasks.length === 0 ? (
                    <span className="text-xs text-gray-400 text-center">
                        No tasks
                    </span>
                ) : (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))
                )}
            </div>
        </Paper>
    );
};