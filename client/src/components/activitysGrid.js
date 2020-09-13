import React, { Fragment, useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ActivityCardGrid from '../components/activityCardGrid';
function ActivitysGrid({ activitys }) {
    const [activityLayout, setActivityLayout] = useState(null);

    useEffect(() => {
        let num_of_rows;
        if (activitys.length % 3 === 0) {
            num_of_rows = activitys.length / 3;
        } else {
            num_of_rows = parseInt((activitys.length / 3) + 1);
        }
        let count;
        let tempLayout = [];
        for (count = 0; count < num_of_rows; count++) {
            let x;
            let tempRow = [];
            for (x = 0; x < 3; x++) {
                if (((count + 1) * (x + 1) - 1) < (activitys.length)) {
                    tempRow.push(activitys[(count + 1) * (x + 1) - 1]);
                } else {
                    tempRow.push(null)
                }
            }
            tempLayout.push({ cols: tempRow });
        }
        setActivityLayout(tempLayout);
    }, [activitys]);
    return (
        <Fragment>
            {activityLayout && (
                <Container >
                    {activityLayout.map((activityRow, index) => (
                        <Droppable droppableId={`user_activitys${index}`} isDropDisabled={true}
                            direction='horizontal'
                            key={`Row${index}`}>
                            {(provided, snapshot) => (
                                <Row ref={provided.innerRef}>
                                    {activityRow.cols.map((activityCols, index) => (
                                        <div key={`Col${index}`} style={{ width: '33%' }}>
                                            {activityCols !== null ? (
                                                <ActivityCardGrid activity={{ ...activityCols, index }} />
                                            ) : (
                                                    <Fragment />
                                                )}
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </Row>
                            )}
                        </Droppable>
                    ))}
                </Container>
            )}
        </Fragment>
    )
}

export default ActivitysGrid;