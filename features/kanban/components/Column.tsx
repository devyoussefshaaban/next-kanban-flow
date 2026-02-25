'use client';

import React, { useState } from 'react';
import { Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Column as ColumnType, Task, TaskPriority } from '@/features/kanban/types/Task';
import TaskCard from './TaskCard';
import { useTaskStore } from '@/store/tasks.store';
import AddTaskModal from './AddTaskModal';

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
    const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);

    return (
        <>
            <Paper
                elevation={0}
                className="flex flex-col w-full rounded-xl border border-blue-200 bg-blue-50 px-2"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-blue-800">
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
                                onClick={() => setOpenAddTaskModal(true)}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        )}
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

                <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddTaskModal(true)}
                    sx={{
                        textTransform: 'none',
                        justifyContent: 'center',
                        padding: '8px 12px',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                        my: 2
                    }}
                >
                    Add Task
                </Button>
            </Paper>

            {
                openAddTaskModal && (
                    <AddTaskModal
                        open={openAddTaskModal}
                        onClose={() => setOpenAddTaskModal(false)}
                        onSubmit={() => console.log("S")}
                        mode="create"
                    />
                )
            }
        </>
    );
};