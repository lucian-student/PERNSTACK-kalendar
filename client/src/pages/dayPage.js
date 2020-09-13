import React, { Fragment, useContext } from 'react';
import UserAcivitysDisplay from '../components/userActivitysDisplay';
import DayActivitysDisplay from '../components/dayActivitysDisplay';
import { DragDropContext } from 'react-beautiful-dnd';
import { DayContext } from '../context/dayContext';
import '../responsivCss/dayPage.css';

function DayPage(props) {
    const date = props.match.params.date;
    const {
        day_activitys,
        setDay_activitys,
        activitys,
        setActivitys
    } = useContext(DayContext);

    function onDragEnd(result) {
        /*  const { destination, source, draggableId } = result;
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
          setActivitys([...tempActivitys]);*/
    }
    return (
        <Fragment>
            <div className='firstCenterDiv'>
                <div className='secondCenterDiv'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <DayActivitysDisplay properties={{ date }} />
                        <UserAcivitysDisplay />
                    </DragDropContext>
                </div>
            </div>
        </Fragment>
    )
}

export default DayPage;