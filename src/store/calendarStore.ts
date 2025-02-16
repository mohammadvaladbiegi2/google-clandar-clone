import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface Event {
    id: string;
    date: string;
    title: string;
    guests: string[];  // مهمان‌ها
    time: string;      // ساعت
    description: string
    meetLink: string
}

interface CalendarState {
    events: Event[] | [];
    selectedDate: string | null;
    showAddEventModal: boolean;  // اضافه کردن این بخش
    editingEventId: string | null;
    setSelectedDate: (date: string) => void;
    setShowAddEventModal: (show: boolean) => void;
    addEvent: (event: Omit<Event, 'id'>) => void;
    editEvent: (id: string, updatedEvent: Omit<Event, 'id'>) => void;
    deleteEvent: (id: string) => void;
    setEditingEventId: (id: string | null) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
    events: [],
    selectedDate: null,
    showAddEventModal: false,  // اینجا هم مقدار اولیه را اضافه کنید
    editingEventId: null,

    setSelectedDate: (date) => set(() => ({ selectedDate: date })),
    setShowAddEventModal: (show) => set(() => ({ showAddEventModal: show })),  // تابع اینجا قرار دارد

    // افزودن رویداد جدید
    addEvent: (event) =>
        set((prevState) => {
            const newEvent = { ...event, id: uuidv4() };
            const newEvents = [...(prevState.events || []), newEvent];
            localStorage.setItem("events", JSON.stringify(newEvents));
            return { events: newEvents };
        }),

    // ویرایش رویداد
    editEvent: (id, updatedEvent) =>
        set((prevState) => {
            const newEvents = (prevState.events || []).map((event) =>
                event.id === id ? { ...event, ...updatedEvent } : event
            );
            localStorage.setItem("events", JSON.stringify(newEvents));
            return { events: newEvents };
        }),

    // حذف رویداد
    deleteEvent: (id) =>
        set((prevState) => {
            const newEvents = (prevState.events || []).filter((event) => event.id !== id);
            localStorage.setItem("events", JSON.stringify(newEvents));
            return { events: newEvents };
        }),

    setEditingEventId: (id) => set(() => ({ editingEventId: id })),
}));
