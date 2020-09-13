import React from 'react';
import ActivityCard from './activityCard';
import { Droppable } from 'react-beautiful-dnd';
function DayColumn({ properties: { date, activitys } }) {

    return (
        <div className='taskColumn'>
            <div className='titleWrapper'>
                <h3 className='columnTitle'>{new Date(date).toDateString()}</h3>
            </div>
            <Droppable droppableId='day_activitys'
                direction='vertical'>
                {(provided, snapshot) => (
                    <div className='columnList'
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {activitys.map((activity, index) => (
                            <ActivityCard activity={{
                                ...activity,
                                index
                            }}
                                key={activity.user_activity_id} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default DayColumn;