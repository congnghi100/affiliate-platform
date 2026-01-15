import { useAffiliateStore } from '../../stores/affiliateStore';
import { Coins, MousePointer, TrendingUp, CreditCard } from 'lucide-react';
import clsx from 'clsx';

const StatCard = ({ icon, label, value, subtext, color }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className={clsx("p-3 rounded-xl", color)}>
                    <Icon size={24} className="text-white" />
                </div>
                {subtext && <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{subtext}</span>}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
            </div>
        </div>
    );
};

export const AffiliateDashboard = () => {
    const { stats } = useAffiliateStore();

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Tổng Quan Affiliate</h1>
                <p className="text-slate-500">Theo dõi hiệu quả tiếp thị của bạn.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Coins}
                    label="Tổng Thu Nhập"
                    value={formatCurrency(stats.totalEarnings)}
                    subtext="+12% tháng này"
                    color="bg-emerald-500"
                />
                <StatCard
                    icon={CreditCard}
                    label="Chờ Thanh Toán"
                    value={formatCurrency(stats.pendingPayout)}
                    color="bg-amber-500"
                />
                <StatCard
                    icon={MousePointer}
                    label="Tổng Click"
                    value={stats.totalClicks}
                    subtext="CTR 3.5%"
                    color="bg-blue-500"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Chuyển Đổi"
                    value={stats.totalConversions}
                    color="bg-purple-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Biểu Đồ Thu Nhập (30 ngày)</h3>
                    <div className="flex-1 flex items-end justify-between px-4 pb-4 border-b border-l border-slate-100 relative">
                        {/* Mock Bar Chart using CSS */}
                        {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
                            <div key={i} className="w-8 bg-blue-100 rounded-t-lg hover:bg-blue-500 transition-colors relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h * 100}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 pt-2 text-xs text-slate-400">
                        <span>Tuần 1</span>
                        <span>Tuần 2</span>
                        <span>Tuần 3</span>
                        <span>Tuần 4</span>
                    </div>
                </div>

                {/* Recent Activity / Top Links */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Link Hiệu Quả Nhất</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {i}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-800">Combo Spa Mùa Hè</p>
                                    <p className="text-xs text-slate-500">12 conversions</p>
                                </div>
                                <span className="text-sm font-bold text-emerald-600">+1.2tr</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
