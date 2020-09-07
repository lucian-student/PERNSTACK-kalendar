import React, { Fragment, useState, useContext } from 'react';
import { CalendarContext } from '../context/calendar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form';
function YearSelect() {
    const [editing, setEditing] = useState(false);
    const { selectedDate, setSelectedDate } = useContext(CalendarContext);
    const { register, handleSubmit, errors } = useForm();

    const handleClose = () => setEditing(false);
    const handleShow = () => setEditing(true);
    function changeYear(data) {
        setSelectedDate({ ...selectedDate, year: data.year });
        handleClose();
    }
    return (
        <Fragment>
            <Fragment>
                <h3 style={{ display: 'inline' }}>
                    {selectedDate.year}
                </h3>
                <Button variant='success' style={{ display: 'inline', float: 'right' }}
                    onClick={handleShow}>
                    Change Year
                    </Button>
            </Fragment>
            <Modal show={editing} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Change year</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(changeYear)}>
                        <Form.Group controlId="formGroupYear">
                            <Form.Control autoComplete="off"
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
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default YearSelect;

/*
  */