import React, { Fragment, useEffect, useState } from 'react';
import { activitysQuery } from '../queries/activitysQueries/queryActivites';
import DayColumn from './dayColumn';
import { DragDropContext } from 'react-beautiful-dnd';

function DragAndDrop({ properties: { page, date } }) {
    const [activitys, setActivitys] = useState([]);
    useEffect(() => {
        activitysQuery(page, setActivitys);
    }, [page]);

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        let tempActivitys = activitys;
        let tempActivity = activitys[source.index];
        tempActivitys.splice(source.index, 1);
        tempActivitys.splice(destination.index, 0, tempActivity);
        setActivitys([...tempActivitys]);
    }
    return (
        <Fragment>
            <DragDropContext onDragEnd={onDragEnd}>
                <DayColumn properties={{ date, activitys }} />
            </DragDropContext>
        </Fragment>
    )
}

export default DragAndDrop;