'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, TimePicker, Tag, Row, Col } from 'antd';
import { useCalendarStore } from '@/store/calendarStore';
import { VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';

const EditEventModal = () => {
    const { events, editingEventId, editEvent, deleteEvent, setEditingEventId } = useCalendarStore();
    const [form] = Form.useForm();
    const [guests, setGuests] = useState<string[]>([]);
    const [guestEmail, setGuestEmail] = useState('');

    const currentEvent = events.find((event) => event.id === editingEventId);

    useEffect(() => {
        if (currentEvent) {
            form.setFieldsValue({
                title: currentEvent.title,
                date: moment(currentEvent.date),
                time: moment(currentEvent.time, 'HH:mm'),
                description: currentEvent.description || '',
                meetLink: currentEvent.meetLink || '',
            });
            setGuests(currentEvent.guests || []);
        }
    }, [currentEvent, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            const updatedEvent = {
                title: values.title,
                date: values.date.format('YYYY-MM-DD'),
                time: values.time.format('HH:mm'),
                description: values.description,
                guests: guests,
                meetLink: values.meetLink,
            };
            editEvent(editingEventId!, updatedEvent);
            closeModal();
        });
    };

    const handleDelete = () => {
        if (editingEventId) {
            deleteEvent(editingEventId);
            closeModal();
        }
    };

    const closeModal = () => {
        setEditingEventId(null);
        form.resetFields();
        setGuests([]);
        setGuestEmail('');
    };

    return (
        <Modal
            title="Edit Event"
            open={!!editingEventId}
            onCancel={closeModal}
            footer={[
                <Button key="delete" danger onClick={handleDelete}>
                    Delete
                </Button>,
                <Button key="back" onClick={closeModal}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Save Changes
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Event Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input event title!' }]}
                >
                    <Input placeholder="Enter event title" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Please select a date!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Time"
                            name="time"
                            rules={[{ required: true, message: 'Please select a time!' }]}
                        >
                            <TimePicker style={{ width: '100%' }} format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Guests"
                    name="guestEmail"
                    rules={[{
                        required: !guests.length,
                        message: 'Please enter a valid Gmail address!',
                        pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    }]}
                >
                    <Row gutter={8}>
                        <Col span={18}>
                            <Input
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder="Add guest email"
                                onPressEnter={() => {
                                    if (form.getFieldError('guestEmail').length === 0) {
                                        setGuests([...guests, guestEmail]);
                                        setGuestEmail('');
                                    }
                                }}
                            />
                        </Col>
                        <Col span={6}>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    if (form.getFieldError('guestEmail').length === 0) {
                                        setGuests([...guests, guestEmail]);
                                        setGuestEmail('');
                                    }
                                }}
                                block
                            >
                                Add Guest
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="my-3">
                    {guests.map((email) => (
                        <Tag key={email} closable onClose={() => setGuests(guests.filter((g) => g !== email))}>
                            {email}
                        </Tag>
                    ))}
                </div>

                <Form.Item label="Google Meet Link" name="meetLink">
                    <Input prefix={<VideoCameraOutlined />} placeholder="Add Google Meet link" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={4} placeholder="Event description (optional)" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditEventModal;
