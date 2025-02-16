'use client';

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, DatePicker, TimePicker, Tag, Row, Col } from 'antd';
import { useCalendarStore } from '@/store/calendarStore';
import { VideoCameraOutlined } from '@ant-design/icons';
import moment from 'moment';

const EditEventModal = () => {
    const { events, editingEventId, editEvent, setEditingEventId } = useCalendarStore();
    const [form] = Form.useForm();
    const [guests, setGuests] = useState<string[]>([]); // حالت برای نگهداری مهمان‌ها
    const [guestEmail, setGuestEmail] = useState(''); // ایمیل مهمان به صورت state برای ورودی

    const currentEvent = events.find((event) => event.id === editingEventId);

    useEffect(() => {
        if (currentEvent) {
            form.setFieldsValue({
                title: currentEvent.title,
                date: moment(currentEvent.date), // تاریخ انتخاب‌شده
                time: moment(currentEvent.time, 'HH:mm'), // ساعت انتخاب‌شده
                description: currentEvent.description || '', // توضیحات
                meetLink: currentEvent.meetLink || '', // لینک Google Meet
            });
            setGuests(currentEvent.guests || []); // مهمان‌ها
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
            setEditingEventId(null);
            form.resetFields();
            setGuests([]); // پاک کردن مهمان‌ها
            setGuestEmail(''); // پاک کردن ورودی ایمیل مهمان
        });
    };

    const handleCancel = () => {
        setEditingEventId(null);
        form.resetFields();
        setGuests([]); // پاک کردن مهمان‌ها
        setGuestEmail(''); // پاک کردن ورودی ایمیل مهمان
    };

    const handleAddGuest = (email: string) => {
        if (email && !guests.includes(email)) {
            setGuests([...guests, email]);
            setGuestEmail(''); // بعد از اضافه کردن ایمیل ورودی را پاک می‌کنیم
        }
    };

    const handleDeleteGuest = (email: string) => {
        setGuests(guests.filter((guest) => guest !== email));
    };

    return (
        <Modal
            title="Edit Event"
            open={!!editingEventId}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Save Changes
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                {/* عنوان رویداد */}
                <Form.Item
                    label="Event Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input event title!' }]}
                >
                    <Input placeholder="Enter event title" />
                </Form.Item>

                {/* تاریخ و ساعت */}
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

                {/* مهمان‌ها */}
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
                                        handleAddGuest(guestEmail);
                                    }
                                }}
                            />
                        </Col>
                        <Col span={6}>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    if (form.getFieldError('guestEmail').length === 0) {
                                        handleAddGuest(guestEmail);
                                    }
                                }}
                                block
                            >
                                Add Guest
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
                <div className='my-3'>
                    {guests.map((email) => (
                        <Tag
                            key={email}
                            closable
                            onClose={() => handleDeleteGuest(email)}
                            className="mr-2"
                        >
                            {email}
                        </Tag>
                    ))}
                </div>

                {/* لینک Google Meet */}
                <Form.Item label="Google Meet Link" name="meetLink">
                    <Input prefix={<VideoCameraOutlined />} placeholder="Add Google Meet link" />
                </Form.Item>

                {/* توضیحات */}
                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={4} placeholder="Event description (optional)" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditEventModal;
