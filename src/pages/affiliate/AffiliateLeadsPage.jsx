import { useState } from 'react';
import { useAffiliateStore } from '../../stores/affiliateStore';
import { Search, Plus, Upload, User, Phone, Building2, Megaphone, Coins, Filter, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export const AffiliateLeadsPage = () => {
    const { leads, addLead, importLeads } = useAffiliateStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', phone: '', brand: '', campaign: '' });

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.phone.includes(searchTerm)
    );

    const handleAddLead = (e) => {
        e.preventDefault();
        addLead(newLead);
        setIsAddModalOpen(false);
        setNewLead({ name: '', phone: '', brand: '', campaign: '' });
    };

    const handleImport = () => {
        const mockImportedLeads = [
            { name: 'Import User 1', phone: '0123000111', brand: 'Beauty Spa', campaign: 'Import Campaign', status: 'New', commission: 0 },
            { name: 'Import User 2', phone: '0123000222', brand: 'Elite Aesthetics', campaign: 'Import Campaign', status: 'New', commission: 0 },
        ];
        importLeads(mockImportedLeads);
        alert('Đã import thành công 2 leads (Giả lập)!');
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Converted': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Contacted': return 'bg-blue-100 text-blue-700';
            case 'New': return 'bg-slate-100 text-slate-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Leads</h1>
                    <p className="text-slate-500">Danh sách khách hàng bạn đã giới thiệu</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleImport}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Upload size={18} /> Import Excel
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                    >
                        <Plus size={20} /> Nhập Lead Mới
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm theo tên hoặc số điện thoại..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                    <Filter size={18} /> Lọc
                </button>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Khách Hàng</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Chương Trình / Brand</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Hoa Hồng</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Trạng Thái</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider text-right">Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-slate-900 flex items-center gap-2 lowercase capitalize first-letter:uppercase">
                                                <User size={14} className="text-slate-400" /> {lead.name}
                                            </p>
                                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                <Phone size={12} className="text-slate-400" /> {lead.phone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                                <Megaphone size={14} className="text-blue-500" /> {lead.campaign}
                                            </p>
                                            <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                                                <Building2 size={12} /> {lead.brand}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-emerald-600 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Coins size={14} /> {formatCurrency(lead.commission)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                            getStatusStyles(lead.status)
                                        )}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                                            <ChevronRight size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Lead Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">Nhập Khách Hàng Mới</h3>
                        </div>
                        <form onSubmit={handleAddLead} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Họ và Tên</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={newLead.name}
                                    onChange={e => setNewLead({ ...newLead, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={newLead.phone}
                                    onChange={e => setNewLead({ ...newLead, phone: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Thương hiệu</label>
                                    <select
                                        required
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={newLead.brand}
                                        onChange={e => setNewLead({ ...newLead, brand: e.target.value })}
                                    >
                                        <option value="">Chọn Brand</option>
                                        <option value="Beauty Spa">Beauty Spa</option>
                                        <option value="Elite Aesthetics">Elite Aesthetics</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Chiến dịch</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ví dụ: Gội đầu"
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={newLead.campaign}
                                        onChange={e => setNewLead({ ...newLead, campaign: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                                >
                                    Lưu Lead
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
