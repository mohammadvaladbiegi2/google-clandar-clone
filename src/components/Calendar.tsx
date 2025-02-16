// components/Calendar.tsx
'use client';

import React from 'react';
import { Calendar as AntCalendar } from 'antd';
import { useCalendarStore } from '@/store/calendarStore';
import EventModal from './EventModal';

const Calendar = () => {
    const { events, selectedDate, setSelectedDate, showModal, setShowModal } = useCalendarStore();

    const handleDateSelect = (date: any) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
        setShowModal(true);
    };

    const renderEvents = (date: any) => {
        const currentDate = date.format('YYYY-MM-DD');
        const filteredEvents = events.filter((event) => event.date === currentDate);

        return (
            <ul className="space-y-1">
                {filteredEvents.map((event, index) => (
                    <li
                        key={index}
                        className="text-xs text-gray-700 hover:text-primary transition-colors duration-200 ease-in-out"
                    >
                        {event.title}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex-1 p-4 bg-gray-100">
            <AntCalendar
                fullscreen={false}
                onSelect={handleDateSelect}
                cellRender={renderEvents}
                className="w-full rounded-lg shadow-md border border-gray-200"
            />
            {showModal && <EventModal />}
        </div>
    );
};

export default Calendar;