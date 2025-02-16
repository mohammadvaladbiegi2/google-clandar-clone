'use client';

import React from 'react';
import { useCalendarStore } from '@/store/calendarStore';

const Sidebar = () => {
    const { events, setSelectedDate, setEditingEventId, setShowModal } = useCalendarStore();

    const handleEventClick = (event: { id: string; date: string }) => {
        setSelectedDate(event.date);
        setEditingEventId(event.id);
        setShowModal(true);
    };

    return (
        <div className="w-64 bg-white p-4 shadow-md h-screen overflow-y-auto border-r border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Events</h2>
            <ul className="space-y-2">
                {events.map((event) => (
                    <li
                        key={event.id}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => handleEventClick(event)}
                    >
                        <span className="block text-sm font-medium text-gray-700">{event.title}</span>
                        <span className="block text-xs text-gray-500">{event.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;