'use client';

import React, { useState } from 'react';
import { Calendar as AntCalendar, Select, Button } from 'antd';
import { useCalendarStore } from '@/store/calendarStore';
import AddEventModal from './AddEventModal';

const Calendar = () => {
    const { events, setShowAddEventModal } = useCalendarStore();
    const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

    const openAddEventModal = () => {
        setShowAddEventModal(true); // فقط مودال افزودن رویداد را باز می‌کنیم
    };

    // نمایش عنوان رویدادها روی تاریخ‌ها
    const renderEvents = (date: any) => {
        const currentDate = date.format('YYYY-MM-DD');
        const filteredEvents = events.filter((event) => event.date === currentDate);

        return (
            <ul className="space-y-1">
                {filteredEvents.map((event, index) => (
                    <li key={index} className="text-xs text-gray-700 hover:text-primary transition-colors">
                        {event.title}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex-1 p-4 bg-gray-100">
            {/* تنظیمات flex برای کنار هم قرار گرفتن */}
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <Button type="primary" size="middle" onClick={openAddEventModal}>
                        Add Event
                    </Button>
                </div>
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold">Calendar</h2>
                    <Select
                        value={viewMode}
                        onChange={(value) => setViewMode(value)}
                        className="w-40"
                        options={[
                            { value: 'month', label: 'Monthly View' },
                            { value: 'year', label: 'Yearly View' }, // اضافه کردن سالانه
                        ]}
                    />
                </div>
            </div>

            <AntCalendar
                mode={viewMode} // حالا می‌تواند از حالت ماهانه یا سالانه استفاده کند
                cellRender={renderEvents}
                className="w-full rounded-lg shadow-md border border-gray-200 p-2"
            />

            {/* فقط مودال افزودن رویداد را نمایش می‌دهیم */}
            <AddEventModal />
        </div>
    );
};

export default Calendar;
