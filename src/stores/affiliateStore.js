import { create } from 'zustand';

export const useAffiliateStore = create((set) => ({
    stats: {
        totalClicks: 1250,
        totalConversions: 45,
        totalEarnings: 8500000,
        pendingPayout: 2100000,
    },

    links: [
        { id: 1, name: 'Giới thiệu Gội đầu', url: 'https://spa.vn/ref/aff01/goi-dau', clicks: 450, conversions: 12, earnings: 180000 },
        { id: 2, name: 'Combo Massage', url: 'https://spa.vn/ref/aff01/massage-body', clicks: 800, conversions: 33, earnings: 8320000 },
    ],

    payouts: [
        { id: 1, date: '2023-05-31', amount: 3500000, status: 'Paid', method: 'Bank Transfer' },
        { id: 2, date: '2023-04-30', amount: 2500000, status: 'Paid', method: 'Bank Transfer' },
    ],

    bankInfo: {
        bankName: 'Vietcombank',
        accountNumber: '999988887777',
        accountName: 'NGUYEN VAN AFFILIATE',
        branch: 'Ho Chi Minh'
    },

    leads: [
        { id: 1, name: 'Nguyễn Văn Nam', phone: '0901234567', brand: 'Beauty Spa', campaign: 'Gội đầu dưỡng sinh', status: 'Converted', commission: 30000, date: '2023-11-20' },
        { id: 2, name: 'Lê Thị Hồng', phone: '0912233445', brand: 'Elite Aesthetics', campaign: 'Massage Body', status: 'Pending', commission: 45000, date: '2023-11-22' },
        { id: 3, name: 'Trần Minh Tuấn', phone: '0988776655', brand: 'Beauty Spa', campaign: 'Trị liệu da mặt', status: 'Contacted', commission: 80000, date: '2023-11-23' },
    ],

    // Actions
    generateLink: (name, campaignId) => set((state) => ({
        links: [...state.links, {
            id: Math.random(),
            name,
            campaignId,
            url: `https://spa.vn/ref/aff01/${Math.random().toString(36).substring(7)}`,
            clicks: 0,
            conversions: 0,
            earnings: 0
        }]
    })),

    updateBankInfo: (info) => set({ bankInfo: info }),

    requestPayout: (amount) => set((state) => ({
        payouts: [
            {
                id: Math.random(),
                date: new Date().toISOString().split('T')[0],
                amount,
                status: 'Pending',
                method: 'Bank Transfer'
            },
            ...state.payouts
        ],
        stats: {
            ...state.stats,
            pendingPayout: state.stats.pendingPayout + amount,
            totalEarnings: state.stats.totalEarnings - amount // Simplified logic for demo
        }
    })),

    addLead: (lead) => set((state) => ({
        leads: [
            {
                ...lead,
                id: Math.random(),
                status: 'New',
                commission: 0,
                date: new Date().toISOString().split('T')[0]
            },
            ...state.leads
        ]
    })),

    importLeads: (leads) => set((state) => ({
        leads: [...leads.map(l => ({ ...l, id: Math.random(), date: new Date().toISOString().split('T')[0] })), ...state.leads]
    })),
}));

