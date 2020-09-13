import React from 'react';
import Card from 'react-bootstrap/Card';
import { Draggable } from 'react-beautiful-dnd';
function ActvityCard({ activity: {
    user_activity_id,
    user_id,
    name,
    description,
    start_time,
    finish_time,
    index
} }) {
    const start = new Date(start_time);
    const finish = new Date(finish_time);
    function betterTimeDisplay(time) {
        if (time / 10 >= 1) {
            return time;
        }
        return `0${time}`;
    }
    return (
        <Draggable draggableId={`user_activity${user_activity_id}`} index={index}>
            {(provided, snapshot) => (
                <Card ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {`${betterTimeDisplay(start.getHours())}:${betterTimeDisplay(start.getMinutes())}
                     - ${betterTimeDisplay(finish.getHours())}:${betterTimeDisplay(finish.getMinutes())}`}
                        </Card.Subtitle>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    )
}

export default ActvityCard;

//  {`${start.getHours()}:${start.getMinutes()} - ${finish.getHours()}:${finish.getMinutes()}`}