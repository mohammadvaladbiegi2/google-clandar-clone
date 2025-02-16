// components/EventModal.tsx
'use client';

import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useCalendarStore } from '@/store/calendarStore';

const EventModal = () => {
    const {
        showModal,
        setShowModal,
        addEvent,
        editEvent,
        deleteEvent,
        selectedDate,
        events,
        editingEventId,
        setEditingEventId,
    } = useCalendarStore();
    const [form] = Form.useForm();

    const currentEvent = events.find((event) => event.id === editingEventId);

    React.useEffect(() => {
        if (currentEvent) {
            form.setFieldsValue({ title: currentEvent.title });
        } else {
            form.resetFields();
        }
    }, [currentEvent, form]);

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingEventId) {
                editEvent(editingEventId, { date: selectedDate!, title: values.title });
                setEditingEventId(null);
            } else {
                addEvent({ date: selectedDate!, title: values.title });
            }
            form.resetFields();
            setShowModal(false);
        });
    };

    const handleDelete = () => {
        if (editingEventId) {
            deleteEvent(editingEventId);
            setEditingEventId(null);
            setShowModal(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingEventId(null);
        setShowModal(false);
    };

    return (
        <Modal
            title={editingEventId ? 'Edit Event' : 'Add Event'}
            open={showModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                editingEventId && (
                    <Button key="delete" danger onClick={handleDelete}>
                        Delete
                    </Button>
                ),
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {editingEventId ? 'Save Changes' : 'Add'}
                </Button>,
            ]}
            className="rounded-lg shadow-lg animate-fade-in"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Event Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input event title!' }]}
                >
                    <Input
                        placeholder="Enter event title"
                        className="border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EventModal;