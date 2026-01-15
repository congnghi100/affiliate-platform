import { useBrandStore } from '../../stores/brandStore';
import { usePlatformStore } from '../../stores/platformStore';
import { useAuthStore } from '../../stores/authStore';
import { Coins, Users, Megaphone, Calendar, Building2 } from 'lucide-react';
import clsx from 'clsx';

const StatCard = ({ icon, label, value, color }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            </div>
            <div className={clsx("p-3 rounded-xl", color)}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    );
};

export const AdminDashboard = () => {
    const { user } = useAuthStore();
    const { stats: brandStats } = useBrandStore();
    const { brands } = usePlatformStore();

    const isPlatformAdmin = user?.role === 'PLATFORM_ADMIN';

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    if (isPlatformAdmin) {
        const totalRevenue = brands.reduce((acc, b) => acc + b.totalRevenue, 0);
        const totalAffiliates = brands.reduce((acc, b) => acc + b.totalAffiliates, 0);

        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Hệ Thống (Platform)</h1>
                    <p className="text-slate-500">Tổng quan toàn bộ hệ thống Affiliate Pro.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={Building2}
                        label="Tổng Thương Hiệu"
                        value={brands.length}
                        color="bg-blue-600"
                    />
                    <StatCard
                        icon={Users}
                        label="Tổng Affiliate"
                        value={totalAffiliates}
                        color="bg-purple-600"
                    />
                    <StatCard
                        icon={Coins}
                        label="Doanh Thu Hệ Thống"
                        value={formatCurrency(totalRevenue)}
                        color="bg-emerald-600"
                    />
                    <StatCard
                        icon={Calendar}
                        label="Brand Mới (Tháng)"
                        value={1}
                        color="bg-amber-600"
                    />
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-96 flex items-center justify-center text-slate-400">
                    Khu vực hiển thị biểu đồ phân tích thị trường & đối tác
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Tổng Quan</h1>
                <p className="text-slate-500">Chào mừng trở lại, đây là tình hình kinh doanh hôm nay.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Coins}
                    label="Tổng Doanh Thu"
                    value={formatCurrency(brandStats.totalRevenue)}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={Users}
                    label="Cộng Tác Viên"
                    value={brandStats.totalAffiliates}
                    color="bg-purple-500"
                />
                <StatCard
                    icon={Megaphone}
                    label="Chiến Dịch Chạy"
                    value={brandStats.activeCampaigns}
                    color="bg-emerald-500"
                />
                <StatCard
                    icon={Calendar}
                    label="Lead Chờ Xử Lý"
                    value={brandStats.pendingLeads}
                    color="bg-amber-500"
                />
            </div>

            {/* Placeholder for future charts */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-96 flex items-center justify-center text-slate-400">
                Khu vực hiển thị biểu đồ tăng trưởng (Sẽ cập nhật sau)
            </div>
        </div>
    );
};
