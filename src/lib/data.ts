import data from '../../data.json';

export interface Counselor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    availableSlots: string[];
    rating: number;
    bio: string;
}

export interface Resource {
    id: string;
    title: string;
    type: 'Article' | 'Audio' | 'Video';
    category: string;
    content?: string;
    url?: string;
    duration?: string;
    readTime?: string;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
}

export interface Appointment {
    id: string;
    counselorId: string;
    date: string;
    slot: string;
    sessionType: 'video' | 'chat' | 'in-person';
    concern: string;
    status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
    notes?: string;
}

export interface FullAppointment extends Appointment {
    studentId: string;
    studentName: string;
}

export interface User {
    name: string;
    studentId: string;
    email?: string;
    appointments: Appointment[];
}

export interface AppData {
    counselors: Counselor[];
    resources: Resource[];
    events: Event[];
    stats: {
        studentsHelped: number;
        activeCounselors: number;
        avgWaitTime: string;
    };
    user: User;
    allAppointments: FullAppointment[];
}

export const getAppData = (): AppData => {
    return data as unknown as AppData;
};

export const getCounselorById = (id: string): Counselor | undefined => {
    return (data as unknown as AppData).counselors.find(c => c.id === id);
};

export const getAppointmentsForCounselor = (counselorId: string): FullAppointment[] => {
    return (data as unknown as AppData).allAppointments.filter(a => a.counselorId === counselorId);
};

