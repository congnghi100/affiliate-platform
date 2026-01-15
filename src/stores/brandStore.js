import { create } from 'zustand';

export const useBrandStore = create((set) => ({
    stats: {
        totalRevenue: 154200000,
        totalAffiliates: 48,
        activeCampaigns: 5,
        pendingLeads: 12,
    },

    services: [
        { id: 1, name: 'Gội đầu dưỡng sinh', price: 150000, commission: 20, status: 'Active' },
        { id: 2, name: 'Massage Body 60p', price: 450000, commission: 15, status: 'Active' },
        { id: 3, name: 'Trị liệu da mặt', price: 800000, commission: 10, status: 'Active' },
    ],

    campaigns: [
        { id: 1, name: 'Khuyễn mãi Mùa Hè', services: [1, 2], startDate: '2023-06-01', status: 'Running', image: '/images/campaign-summer.png', link: 'https://beauty.com/summer-promo' },
        { id: 2, name: 'Combo Thư Giãn', services: [2], startDate: '2023-06-15', status: 'Paused', image: '/images/campaign-relax.png', link: 'https://beauty.com/relax-combo' },
    ],

    affiliates: [
        { id: 1, name: 'Nguyễn Văn A', email: 'aff-a@example.com', status: 'Active', totalLeads: 125, totalRevenue: 18500000, joinDate: '2023-01-10' },
        { id: 2, name: 'Trần Thị B', email: 'aff-b@example.com', status: 'Pending', totalLeads: 0, totalRevenue: 0, joinDate: '2023-06-12' },
        { id: 3, name: 'Lê Văn C', email: 'aff-c@example.com', status: 'Active', totalLeads: 84, totalRevenue: 9200000, joinDate: '2023-03-05' },
        { id: 4, name: 'Phạm Thị D', email: 'aff-d@example.com', status: 'Suspended', totalLeads: 12, totalRevenue: 500000, joinDate: '2023-02-20' },
    ],

    // Actions
    addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: Math.random() }]
    })),

    updateService: (id, updatedService) => set((state) => ({
        services: state.services.map(s => s.id === id ? { ...s, ...updatedService } : s)
    })),

    deleteService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id)
    })),

    addCampaign: (campaign) => set((state) => ({
        campaigns: [...state.campaigns, { ...campaign, id: Math.random() }]
    })),

    updateCampaign: (id, updatedCampaign) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updatedCampaign } : c)
    })),

    deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(c => c.id !== id)
    })),

    updateAffiliateStatus: (id, status) => set((state) => ({
        affiliates: state.affiliates.map(a => a.id === id ? { ...a, status } : a)
    })),
}));
