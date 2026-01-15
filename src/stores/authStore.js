import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: {
        id: '1',
        name: 'Demo User',
        role: 'BRAND_ADMIN', // Default role for dev: 'PLATFORM_ADMIN', 'BRAND_ADMIN', 'AFFILIATE', or null
        email: 'demo@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User',
    },

    isAuthenticated: true, // Mock authenticated state

    login: (role = 'AFFILIATE') => set({
        user: {
            id: '1',
            name: 'Demo User',
            role: role,
            email: 'demo@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Demo+User',
        },
        isAuthenticated: true,
    }),

    logout: () => set({ user: null, isAuthenticated: false }),
}));
