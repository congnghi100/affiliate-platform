import { useState } from 'react';
import { useBrandStore } from '../../stores/brandStore';
import { Search, UserCheck, Shield, UserX, Clock, Mail, Calendar, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

export const AffiliatesPage = () => {
    const { affiliates, updateAffiliateStatus } = useBrandStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredAffiliates = affiliates.filter(aff => {
        const matchesSearch = aff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            aff.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || aff.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Suspended': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Cộng Tác Viên</h1>
                    <p className="text-slate-500">Xem danh sách và phê duyệt đối tác của thương hiệu</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {['All', 'Active', 'Pending', 'Suspended'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                statusFilter === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                            )}
                        >
                            {status === 'All' ? 'Tất cả' : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Affiliates Grid/Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Cộng Tác Viên</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-center">Hiệu Quả</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Ngày Tham Gia</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Trạng Thái</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAffiliates.map((aff) => (
                                <tr key={aff.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                {aff.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{aff.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Mail size={12} /> {aff.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-6">
                                            <div className="text-center">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">Leads</p>
                                                <p className="text-sm font-bold text-slate-700">{aff.totalLeads}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">Doanh Thu</p>
                                                <p className="text-sm font-bold text-emerald-600">{formatCurrency(aff.totalRevenue)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar size={14} /> {aff.joinDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-bold uppercase",
                                            getStatusStyles(aff.status)
                                        )}>
                                            {aff.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            {aff.status === 'Pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateAffiliateStatus(aff.id, 'Active')}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                        title="Phê duyệt"
                                                    >
                                                        <UserCheck size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => updateAffiliateStatus(aff.id, 'Suspended')}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Từ chối"
                                                    >
                                                        <UserX size={20} />
                                                    </button>
                                                </>
                                            )}
                                            {aff.status === 'Active' && (
                                                <button
                                                    onClick={() => updateAffiliateStatus(aff.id, 'Suspended')}
                                                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Tạm dừng"
                                                >
                                                    <Shield size={20} />
                                                </button>
                                            )}
                                            {aff.status === 'Suspended' && (
                                                <button
                                                    onClick={() => updateAffiliateStatus(aff.id, 'Active')}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Kích hoạt lại"
                                                >
                                                    <UserCheck size={20} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
