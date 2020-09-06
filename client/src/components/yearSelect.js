import React, { Fragment, useState, useContext } from 'react';
import { CalendarContext } from '../context/calendar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
function YearSelect() {
    const [editing, setEditing] = useState(false);
    const { selectedDate, setSelectedDate } = useContext(CalendarContext);
    const { register, handleSubmit, errors } = useForm();

    function changeYear(data) {

    }
    return (
        <Fragment>
            {!editing ? (
                <Fragment>
                    <h3 style={{ display: 'inline' }}>
                        {selectedDate.year}
                    </h3>
                    <Button style={{ display: 'inline', float: 'right' }}
                        onClick={() => setEditing(true)}>
                        Change Year
                    </Button>
                </Fragment>
            ) : (
                    <Form onSubmit={handleSubmit(changeYear)}>
                        <Form.Group controlId="formGroupYear">
                            <Form.Control autoComplete="on"
                                name='year'
                                type="number"
                                defaultValue={selectedDate.year}
                                ref={register({
                                    required: true
                                })} />
                            {errors.email && errors.email.type === "required" && (
                                <Form.Text className="helperText">Year is empty!</Form.Text>
                            )}
                        </Form.Group>
                        <Button type='submit' >
                            Submit
                        </Button>
                    </Form>
                )}
        </Fragment>
    )
}

export default YearSelect;