import { create } from 'zustand';

export const usePlatformStore = create((set) => ({
    brands: [
        {
            id: 1,
            name: 'Beauty Spa & Clinic',
            owner: 'Nguyễn Thị Spa',
            email: 'spa@beauty.com',
            status: 'Active',
            totalAffiliates: 25,
            totalRevenue: 450000000,
            createdAt: '2023-01-15'
        },
        {
            id: 2,
            name: 'Elite Aesthetics',
            owner: 'Trần Văn Clinic',
            email: 'contact@elite.com',
            status: 'Active',
            totalAffiliates: 12,
            totalRevenue: 280000000,
            createdAt: '2023-03-20'
        },
        {
            id: 3,
            name: 'Sun Wellness',
            owner: 'Lê Thu Thảo',
            email: 'hello@sunwellness.com',
            status: 'Suspended',
            totalAffiliates: 8,
            totalRevenue: 95000000,
            createdAt: '2023-05-10'
        }
    ],

    // Actions
    addBrand: (brand) => set((state) => ({
        brands: [
            ...state.brands,
            {
                ...brand,
                id: Math.random(),
                status: 'Active',
                totalAffiliates: 0,
                totalRevenue: 0,
                createdAt: new Date().toISOString().split('T')[0]
            }
        ]
    })),

    updateBrandStatus: (id, status) => set((state) => ({
        brands: state.brands.map(b => b.id === id ? { ...b, status } : b)
    })),

    deleteBrand: (id) => set((state) => ({
        brands: state.brands.filter(b => b.id !== id)
    }))
}));
