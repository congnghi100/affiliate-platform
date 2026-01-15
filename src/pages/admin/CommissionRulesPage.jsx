import { useState } from 'react';
import { usePlatformStore } from '../../stores/platformStore';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, ShieldCheck, Zap, Activity } from 'lucide-react';
import clsx from 'clsx';

export const CommissionRulesPage = () => {
    const { commissionRules, addCommissionRule, deleteCommissionRule } = usePlatformStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        ruleName: '',
        scope: 'Service',
        priority: 10,
        discountValue: 0,
        status: 'Active'
    });

    const filteredRules = commissionRules.filter(r =>
        r.ruleName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        addCommissionRule(formData);
        setIsAddModalOpen(false);
        setFormData({ ruleName: '', scope: 'Service', priority: 10, discountValue: 0, status: 'Active' });
    };

    const getScopeIcon = (scope) => {
        switch (scope) {
            case 'Service': return <ShieldCheck size={14} className="text-blue-500" />;
            case 'Campaign': return <Zap size={14} className="text-amber-500" />;
            case 'Lifecycle': return <Activity size={14} className="text-purple-500" />;
            default: return <ShieldCheck size={14} />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quy Tắc Hoa Hồng</h1>
                    <p className="text-slate-500">Thiết lập cơ chế chia sẻ lợi nhuận toàn hệ thống</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Plus size={20} /> Tạo Rule Mới
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm theo tên quy tắc..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                    <Filter size={18} /> Lọc
                </button>
            </div>

            {/* Rules Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 italic">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Tên Quy Tắc</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Phạm Vi (Scope)</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Ưu Tiên (Priority)</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Chiết Khấu</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider">Trạng Thái</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 uppercase text-[10px] tracking-wider text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredRules.map((rule) => (
                            <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-slate-900">{rule.ruleName}</td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        {getScopeIcon(rule.scope)} {rule.scope}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-slate-100 px-2 py-1 rounded-md text-xs font-bold text-slate-600 border border-slate-200">
                                        {rule.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-emerald-600 font-bold">{rule.discountValue}%</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                        rule.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                                    )}>
                                        {rule.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right transform">
                                    <div className="flex justify-end gap-2 text-slate-400">
                                        <button className="hover:text-blue-600"><Edit2 size={16} /></button>
                                        <button onClick={() => deleteCommissionRule(rule.id)} className="hover:text-red-600"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Rule Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">Tạo Quy Tắc Mới</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Quy Tắc</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={formData.ruleName}
                                    onChange={e => setFormData({ ...formData, ruleName: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phạm Vi</label>
                                    <select
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={formData.scope}
                                        onChange={e => setFormData({ ...formData, scope: e.target.value })}
                                    >
                                        <option value="Service">Service</option>
                                        <option value="Campaign">Campaign</option>
                                        <option value="Lifecycle">Lifecycle</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Độ Ưu Tiên</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={formData.priority}
                                        onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">% Chiết Khấu</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={formData.discountValue}
                                    onChange={e => setFormData({ ...formData, discountValue: parseInt(e.target.value) })}
                                />
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
                                    Lưu Quy Tắc
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
