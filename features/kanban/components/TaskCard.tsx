import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { Task } from "../types/Task"

const TaskCard = ({ task }: { task: Task }) => {
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {task.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {task.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {task.priority}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TaskCard