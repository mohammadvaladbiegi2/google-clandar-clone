'use client';

import React, { useState, useEffect } from 'react';
import { useCalendarStore } from '@/store/calendarStore';
import EditEventModal from './EditEventModal';
import { Skeleton, Tag } from 'antd'; // اضافه کردن Skeleton
import moment from 'moment';

const Sidebar = () => {
    const { events, setSelectedDate, setEditingEventId } = useCalendarStore();
    const [loading, setLoading] = useState<boolean>(true); // حالت بارگذاری

    // شبیه‌سازی بارگذاری داده‌ها (برای نمونه)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false); // بعد از 2 ثانیه بارگذاری تمام می‌شود
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleEventClick = (event: { id: string; date: string }) => {
        setSelectedDate(event.date);
        setEditingEventId(event.id);
    };

    return (
        <>
            <div className="w-64 bg-white p-4 shadow-md h-screen overflow-y-auto border-r border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Events</h2>

                {loading ? (
                    <ul className="space-y-2">
                        <li className="p-3 bg-gray-200 rounded-lg">
                            <Skeleton.Avatar active size="large" shape="square" />
                        </li>
                        <li className="p-3 bg-gray-200 rounded-lg">
                            <Skeleton.Avatar active size="large" shape="square" />
                        </li>
                        <li className="p-3 bg-gray-200 rounded-lg">
                            <Skeleton.Avatar active size="large" shape="square" />
                        </li>
                    </ul>


                ) : (
                    <ul className="space-y-2">
                        {events.map((event) => (
                            <li
                                key={event.id}
                                className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => handleEventClick(event)}
                            >
                                <span className="block text-sm font-medium text-gray-700">{event.title}</span>
                                <span className="block text-xs text-gray-500">{moment(event.date).format('MMM Do YYYY')}</span>
                                <span className="block text-xs text-gray-400">{event.time}</span>

                                {/* نمایش مهمان‌ها */}
                                <div className="mt-1">
                                    {event.guests && event.guests.length > 0 && (
                                        <div>
                                            {event.guests.slice(0, 1).map((guest: string, index: number) => (
                                                <Tag key={index} color="blue" className="mr-2">
                                                    {guest}
                                                </Tag>
                                            ))}

                                        </div>
                                    )}
                                </div>


                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <EditEventModal />
        </>
    );
};

export default Sidebar;
