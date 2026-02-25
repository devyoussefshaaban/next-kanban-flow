import { Card, CardActions, CardContent, IconButton, Typography, Box, Chip } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task, TaskPriority } from "../types/Task"
import { useSortable } from "@dnd-kit/react/sortable"
import { closestCorners } from "@dnd-kit/collision"

interface TaskCardProps {
    task: Task;
    index: number;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
}

const TaskCard = ({ task, index, onEdit, onDelete }: TaskCardProps) => {
    const { ref, isDragging } = useSortable({
        id: task.id,
        index,
        data: task,
        collisionDetector: closestCorners
    });

    const getPriorityColor = (priority: TaskPriority) => {
        switch (priority) {
            case TaskPriority.High: return 'error';
            case TaskPriority.Medium: return 'warning';
            case TaskPriority.Low: return 'success';
            default: return 'default';
        }
    }

    return (
        <Card
            ref={ref}
            className={`group transition-all hover:shadow-md border border-gray-100 rounded-xl ${isDragging ? 'opacity-50 grayscale' : ''}`}
            sx={{
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' }
            }}
        >
            <CardContent className="space-y-3 pb-2">
                <Box className="flex items-start justify-between">
                    <Typography variant="subtitle1" component="div" className="font-semibold leading-tight text-gray-800">
                        {task.title}
                    </Typography>
                    <Box className="flex gap-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEdit?.(task); }}>
                            <EditIcon fontSize="small" className="text-gray-400 hover:text-blue-500" />
                        </IconButton>
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDelete?.(task.id); }}>
                            <DeleteIcon fontSize="small" className="text-gray-400 hover:text-red-500" />
                        </IconButton>
                    </Box>
                </Box>

                {task.description && (
                    <Typography variant="body2" className="text-gray-600 line-clamp-2">
                        {task.description}
                    </Typography>
                )}

                <Box className="flex items-center gap-2 pt-1">
                    <Chip
                        label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        size="small"
                        color={getPriorityColor(task.priority)}
                        className="text-[10px] h-5 font-bold uppercase"
                        variant="outlined"
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default TaskCard