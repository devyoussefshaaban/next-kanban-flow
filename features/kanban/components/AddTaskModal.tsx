'use client';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Box,
    Typography
} from '@mui/material';
import { Column, TaskPriority } from '@/features/kanban/types/Task';
import { TaskFormData, taskSchema } from '@/lib/utils';

interface TaskModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => void;
    initialData?: Partial<TaskFormData>;
    mode?: 'create' | 'edit';
}

export default function AddTaskModal({
    open,
    onClose,
    onSubmit,
    initialData,
    mode = 'create'
}: TaskModalProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            description: '',
            column: Column.Backlog,
            priority: TaskPriority.Medium,
            ...initialData
        }
    });

    // Reset form when modal opens/closes or initialData changes
    useEffect(() => {
        if (open) {
            reset({
                title: '',
                description: '',
                column: Column.Backlog,
                priority: TaskPriority.Medium,
                ...initialData
            });
        }
    }, [open, initialData, reset]);

    const handleFormSubmit = async (data: TaskFormData) => {
        await onSubmit(data);
        onClose();
    };

    const getColumnLabel = (column: Column) => {
        return column.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                className: 'rounded-lg'
            }}
        >
            <DialogTitle className="border-b border-gray-200 pb-4">
                <Typography variant="h6" component="div" className="font-semibold">
                    {mode === 'create' ? 'Create New Task' : 'Edit Task'}
                </Typography>
            </DialogTitle>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent className="space-y-4 pt-4">
                    {/* Title Field */}
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                variant="outlined"
                                size="medium"
                                sx={{ mb: 2 }}
                            />
                        )}
                    />

                    {/* Description Field */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        )}
                    />

                    {/* Column Select */}
                    <Controller
                        name="column"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.column}>
                                <InputLabel>Column</InputLabel>
                                <Select
                                    {...field}
                                    label="Column"
                                    sx={{ mb: 2 }}
                                >
                                    {Object.values(Column).map((column) => (
                                        <MenuItem key={column} value={column}>
                                            {getColumnLabel(column)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.column && (
                                    <FormHelperText>{errors.column.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                    {/* Priority Select */}
                    <Controller
                        name="priority"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.priority}>
                                <InputLabel>Priority</InputLabel>
                                <Select
                                    {...field}
                                    label="Priority"
                                    sx={{ mb: 2 }}
                                >
                                    {Object.values(TaskPriority).map((priority) => (
                                        <MenuItem key={priority} value={priority}>
                                            <Box className="flex items-center gap-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full ${priority === TaskPriority.High
                                                        ? 'bg-red-500'
                                                        : priority === TaskPriority.Medium
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                        }`}
                                                />
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.priority && (
                                    <FormHelperText>{errors.priority.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                </DialogContent>

                <DialogActions className="border-t border-gray-200 px-6 py-4">
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        className="mr-2"
                        sx={{ textTransform: "none" }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700"
                        sx={{ textTransform: "none" }}
                    >
                        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}