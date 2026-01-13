import data from '../../data.json';

const DB_KEY = 'dt_prototype_db';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'counselor';
}

export interface Appointment {
    id: string;
    studentId: string;
    studentName: string;
    counselorId: string;
    date: string;
    slot: string;
    sessionType: string;
    concern: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
    notes?: string;
}

// Initialize DB if empty
if (typeof window !== 'undefined' && !localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

export const db = {
    // --- Auth ---
    login: (id: string, password: string): User | null => {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return null;
        const dbData = JSON.parse(raw);

        // Check students
        const student = dbData.users.find((u: any) => u.id === id && u.password === password);
        if (student) return { id: student.id, name: student.name, email: student.email, role: 'student' };

        // Check counselors
        const counselor = dbData.counselors.find((c: any) => c.id === id && c.password === password);
        if (counselor) return { id: counselor.id, name: counselor.name, email: counselor.email, role: 'counselor' };

        return null;
    },

    // --- Data Access ---
    getStudentData: (studentId: string) => {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return null;
        const dbData = JSON.parse(raw);

        // Filter appointments for this student
        const myAppointments = dbData.allAppointments.filter((a: any) => a.studentId === studentId);

        return {
            user: dbData.users.find((u: any) => u.id === studentId),
            appointments: myAppointments,
            stats: dbData.stats,
            events: dbData.events,
            resources: dbData.resources,
            counselors: dbData.counselors
        };
    },

    getCounselorData: (counselorId: string) => {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return null;
        const dbData = JSON.parse(raw);

        const myAppointments = dbData.allAppointments.filter((a: any) => a.counselorId === counselorId);

        return {
            counselor: dbData.counselors.find((c: any) => c.id === counselorId),
            appointments: myAppointments
        };
    },

    getAllData: () => {
        const raw = localStorage.getItem(DB_KEY);
        return raw ? JSON.parse(raw) : data;
    },

    // --- Mutations ---
    updateAppointmentStatus: (id: string, status: string) => {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return;
        const dbData = JSON.parse(raw);

        const appIndex = dbData.allAppointments.findIndex((a: any) => a.id === id);
        if (appIndex > -1) {
            dbData.allAppointments[appIndex].status = status;
            localStorage.setItem(DB_KEY, JSON.stringify(dbData));

            // Trigger storage event manually for current tab
            window.dispatchEvent(new Event('storage'));
        }
    },

    createAppointment: (appointment: Appointment) => {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) return;
        const dbData = JSON.parse(raw);

        dbData.allAppointments.push(appointment);
        localStorage.setItem(DB_KEY, JSON.stringify(dbData));
        window.dispatchEvent(new Event('storage'));
    }
};
