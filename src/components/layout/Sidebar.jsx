import { useAuthStore } from '../../stores/authStore';
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingBag,
    Megaphone,
    Link as LinkIcon,
    FileText,
    UserCheck,
    CalendarCheck,
    LogOut,
    Wallet
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const Sidebar = () => {
    const { user, logout } = useAuthStore();

    const getNavItems = () => {
        switch (user?.role) {
            case 'PLATFORM_ADMIN':
                return [
                    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', end: true },
                    { icon: Users, label: 'Thương hiệu', path: '/admin/brands' },
                    { icon: Settings, label: 'Cấu hình', path: '/admin/settings' },
                ];
            case 'BRAND_ADMIN':
                return [
                    { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin', end: true },
                    { icon: ShoppingBag, label: 'Dịch vụ', path: '/admin/services' },
                    { icon: Megaphone, label: 'Chiến dịch', path: '/admin/campaigns' },
                    { icon: UserCheck, label: 'Quản lý Leads', path: '/admin/leads' },
                    { icon: CalendarCheck, label: 'Lịch Hẹn', path: '/admin/bookings' },
                    { icon: Users, label: 'Cộng tác viên', path: '/admin/affiliates' },
                    { icon: FileText, label: 'Báo cáo', path: '/admin/reports' },
                ];
            case 'AFFILIATE':
                return [
                    { icon: LayoutDashboard, label: 'Tổng quan', path: '/affiliate', end: true },
                    { icon: LinkIcon, label: 'Link giới thiệu', path: '/affiliate/links' },
                    { icon: UserCheck, label: 'Khách hàng', path: '/affiliate/leads' },
                    { icon: Wallet, label: 'Thu nhập', path: '/affiliate/payouts' },
                    { icon: Settings, label: 'Cài đặt', path: '/affiliate/settings' },
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Affiliate Pro
                </h1>
                <p className="text-xs text-slate-400 mt-1">{user?.role?.replace('_', ' ')}</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) => clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            isActive
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        )}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-4">
                <div className="flex items-center gap-3 px-4 py-2">
                    <img src={user?.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};
