
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

interface Event {
    id: string;
    date: string;
    title: string;
}

interface CalendarState {
    events: Event[];
    selectedDate: string | null;
    showModal: boolean;
    editingEventId: string | null;
    setSelectedDate: (date: string) => void;
    setShowModal: (show: boolean) => void;
    addEvent: (event: Omit<Event, 'id'>) => void;
    editEvent: (id: string, updatedEvent: Omit<Event, 'id'>) => void;
    deleteEvent: (id: string) => void;
    setEditingEventId: (id: string | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    selectedDate: null,
    showModal: false,
    editingEventId: null,
    setSelectedDate: (date) => set({ selectedDate: date }),
    setShowModal: (show) => set({ showModal: show }),
    addEvent: (event) =>
        set((state) => ({
            events: [...state.events, { ...event, id: uuidv4() }], // استفاده از uuid برای تولید id
        })),
    editEvent: (id, updatedEvent) =>
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, ...updatedEvent } : event
            ),
        })),
    deleteEvent: (id) =>
        set((state) => ({
            events: state.events.filter((event) => event.id !== id),
        })),
    setEditingEventId: (id) => set({ editingEventId: id }),
}));

// Hook جداگانه برای مدیریت localStorage
export const usePersistedEvents = () => {
    const { events, addEvent, editEvent, deleteEvent } = useCalendarStore();

    // خواندن اطلاعات از localStorage هنگام بارگذاری صفحه
    useEffect(() => {
        const storedEvents = localStorage.getItem('events');
        if (storedEvents) {
            const parsedEvents = JSON.parse(storedEvents);
            parsedEvents.forEach((event: Event) => {
                addEvent(event); // اضافه کردن رویدادها به state
            });
        }
    }, [addEvent]);

    // ذخیره‌سازی تغییرات در localStorage
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);
};