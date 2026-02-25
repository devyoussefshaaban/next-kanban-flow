'use client';

import React, { useState } from 'react';
import { Paper, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Column as ColumnType, Task } from '@/features/kanban/types/Task';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { useDroppable } from '@dnd-kit/react';
import { closestCorners } from '@dnd-kit/collision';

interface ColumnProps {
    column: ColumnType;
    title: string;
    tasks: Task[];
    onAddTask?: (column: ColumnType) => void;
    onUpdateTask?: (task: Task) => void;
    onDeleteTask?: (taskId: string) => void;
    onCreateTask?: (data: any) => void;
}

export const Column: React.FC<ColumnProps> = ({
    column,
    title,
    tasks,
    onUpdateTask,
    onDeleteTask,
    onCreateTask
}) => {
    const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const { ref: dropRef, isDropTarget } = useDroppable({
        id: column,
        data: { column },
        collisionDetector: closestCorners
    });

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setOpenAddTaskModal(true);
    };

    const handleFormSubmit = (data: any) => {
        if (editingTask) {
            onUpdateTask?.({ ...editingTask, ...data });
        } else {
            onCreateTask?.(data);
        }
        setOpenAddTaskModal(false);
        setEditingTask(null);
    };

    const handleCloseModal = () => {
        setOpenAddTaskModal(false);
        setEditingTask(null);
    };

    return (
        <>
            <Paper
                elevation={0}
                className={`flex flex-col w-full rounded-xl border transition-colors h-fit ${isDropTarget ? 'border-blue-400 bg-blue-100 shadow-lg' : 'border-blue-200 bg-blue-50'} px-2`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-blue-900 uppercase tracking-tight">
                            {title}
                        </h2>
                        <span className="text-xs font-bold px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full">
                            {tasks.length}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <IconButton
                            size="small"
                            onClick={() => setOpenAddTaskModal(true)}
                            className="hover:bg-blue-200 text-blue-600"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={dropRef}
                    className="flex flex-col gap-3 p-3 min-h-[150px]"
                >
                    {tasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-blue-200 rounded-xl bg-white/50">
                            <span className="text-xs text-blue-400 font-medium text-center">
                                Drop tasks here or use "Add Task"
                            </span>
                        </div>
                    ) : (
                        tasks.map((task, index) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                index={index}
                                onEdit={handleEdit}
                                onDelete={onDeleteTask}
                            />
                        ))
                    )}
                </div>

                <Button
                    variant="text"
                    fullWidth
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddTaskModal(true)}
                    sx={{
                        textTransform: 'none',
                        justifyContent: 'center',
                        padding: '12px',
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: 'rgba(37, 99, 235, 0.08)',
                            color: 'primary.main'
                        },
                        mt: 'auto',
                        mb: 1
                    }}
                >
                    Add Task
                </Button>
            </Paper>

            <AddTaskModal
                open={openAddTaskModal}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                initialData={editingTask || { column }}
                mode={editingTask ? 'edit' : 'create'}
            />
        </>
    );
};