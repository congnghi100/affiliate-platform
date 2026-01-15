import { create } from 'zustand';

export const useCRMStore = create((set) => ({
    leads: [
        { id: 1, name: 'Nguyễn Thị Hoa', phone: '0901234567', email: 'hoa@example.com', source: 'Affiliate A', status: 'New', date: '2023-06-15' },
        { id: 2, name: 'Trần Văn Bình', phone: '0912345678', email: 'binh@example.com', source: 'Affiliate B', status: 'Contacted', date: '2023-06-14' },
        { id: 3, name: 'Lê Thu Thảo', phone: '0987654321', email: 'thao@example.com', source: 'Affiliate A', status: 'Converted', date: '2023-06-12' },
    ],

    bookings: [
        { id: 1, customer: 'Phạm Minh', service: 'Gội đầu dưỡng sinh', date: '2023-06-20', time: '14:00', status: 'Confirmed', affiliate: 'Affiliate A' },
        { id: 2, customer: 'Hoàng Lan', service: 'Massage Body', date: '2023-06-21', time: '10:00', status: 'Pending', affiliate: 'Affiliate C' },
    ],

    // Actions
    updateLeadStatus: (id, status) => set((state) => ({
        leads: state.leads.map(lead => lead.id === id ? { ...lead, status } : lead)
    })),

    updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map(booking => booking.id === id ? { ...booking, status } : booking)
    })),
}));
