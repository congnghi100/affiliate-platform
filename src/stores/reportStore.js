import { create } from 'zustand';

export const useReportStore = create(() => ({
    revenueData: [
        { name: 'Tháng 1', value: 45000000 },
        { name: 'Tháng 2', value: 52000000 },
        { name: 'Tháng 3', value: 48000000 },
        { name: 'Tháng 4', value: 61000000 },
        { name: 'Tháng 5', value: 55000000 },
        { name: 'Tháng 6', value: 67000000 },
    ],

    sourceData: [
        { name: 'Facebook', value: 400 },
        { name: 'TikTok', value: 300 },
        { name: 'Google', value: 200 },
        { name: 'Affiliate', value: 600 },
        { name: 'Direct', value: 100 },
    ],

    affiliatePerformance: [
        { name: 'Affiliate A', revenue: 12000000, leads: 45 },
        { name: 'Affiliate B', revenue: 8500000, leads: 32 },
        { name: 'Affiliate C', revenue: 15600000, leads: 58 },
        { name: 'Affiliate D', revenue: 4200000, leads: 15 },
    ]
}));
