import { useState } from 'react';
import { useCRMStore } from '../../stores/crmStore';
import { Search, Filter, Phone, Mail, User } from 'lucide-react';
import clsx from 'clsx';

export const LeadsPage = () => {
    const { leads, updateLeadStatus } = useCRMStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Lead</h1>
                    <p className="text-slate-500">Danh sách khách hàng tiềm năng từ Affiliate</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, SĐT..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative min-w-[150px]">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Tất cả trạng thái</option>
                        <option value="New">Mới</option>
                        <option value="Contacted">Đã liên hệ</option>
                        <option value="Converted">Đã chốt</option>
                        <option value="Junk">Rác</option>
                    </select>
                </div>
            </div>

            {/* Leads List */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Khách Hàng</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Thông Tin Liên Hệ</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Nguồn</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Ngày Tạo</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User size={20} />
                                        </div>
                                        <span className="font-medium text-slate-900">{lead.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1 text-sm text-slate-600">
                                        <div className="flex items-center gap-2"><Phone size={14} /> {lead.phone}</div>
                                        <div className="flex items-center gap-2"><Mail size={14} /> {lead.email}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                        {lead.source}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 text-sm">{lead.date}</td>
                                <td className="px-6 py-4">
                                    <select
                                        className={clsx(
                                            "px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",
                                            lead.status === 'New' && "bg-blue-100 text-blue-700",
                                            lead.status === 'Contacted' && "bg-amber-100 text-amber-700",
                                            lead.status === 'Converted' && "bg-emerald-100 text-emerald-700",
                                            lead.status === 'Junk' && "bg-slate-100 text-slate-600",
                                        )}
                                        value={lead.status}
                                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                    >
                                        <option value="New">Mới</option>
                                        <option value="Contacted">Đã liên hệ</option>
                                        <option value="Converted">Đã chốt</option>
                                        <option value="Junk">Rác</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
