import { useState } from 'react';
import { usePlatformStore } from '../../stores/platformStore';
import { Plus, Search, Building2, User, Mail, Globe, MoreVertical, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export const BrandsPage = () => {
    const { brands, addBrand, updateBrandStatus, deleteBrand } = usePlatformStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBrand, setNewBrand] = useState({ name: '', owner: '', email: '' });

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        addBrand(newBrand);
        setIsModalOpen(false);
        setNewBrand({ name: '', owner: '', email: '' });
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Thương Hiệu</h1>
                    <p className="text-slate-500">Danh sách các đối tác (Tenants) đang sử dụng nền tảng</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={20} /> Tạo Thương Hiệu Mới
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Tổng Thương Hiệu</p>
                    <p className="text-2xl font-bold text-slate-900">{brands.length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-emerald-600">{brands.filter(b => b.status === 'Active').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Bị tạm dừng</p>
                    <p className="text-2xl font-bold text-amber-600">{brands.filter(b => b.status === 'Suspended').length}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Tổng doanh thu hệ thống</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(brands.reduce((acc, b) => acc + b.totalRevenue, 0))}</p>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm thương hiệu, chủ sở hữu..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Brands Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Tên Thương Hiệu</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Chủ Sở Hữu</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Liên Hệ</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-center">CTV / Thu Nhập</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Trạng Thái</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBrands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                                                <Building2 size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{brand.name}</p>
                                                <p className="text-xs text-slate-500">ID: {brand.id.toString().substring(2, 8)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-700">
                                            <User size={16} className="text-slate-400" />
                                            {brand.owner}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-600">
                                            <div className="flex items-center gap-2 font-medium">
                                                <Mail size={14} className="text-slate-400" /> {brand.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                                                <Globe size={14} /> app.platform.vn/{brand.name.toLowerCase().replace(/\s+/g, '-')}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div>
                                            <p className="text-sm font-bold text-slate-700">{brand.totalAffiliates} CTV</p>
                                            <p className="text-xs text-emerald-600 font-medium">{formatCurrency(brand.totalRevenue)}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                            brand.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                        )}>
                                            {brand.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            {brand.status === 'Active' ? (
                                                <button
                                                    onClick={() => updateBrandStatus(brand.id, 'Suspended')}
                                                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Tạm dừng"
                                                >
                                                    <ShieldAlert size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateBrandStatus(brand.id, 'Active')}
                                                    className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    title="Kích hoạt"
                                                >
                                                    <ShieldCheck size={18} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => { if (confirm('Xóa thương hiệu này?')) deleteBrand(brand.id) }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Brand Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Thống Kê Thương Hiệu Mới</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Thương Hiệu</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={newBrand.name}
                                    onChange={e => setNewBrand({ ...newBrand, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Chủ Sở Hữu</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={newBrand.owner}
                                    onChange={e => setNewBrand({ ...newBrand, owner: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Liên Hệ</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={newBrand.email}
                                    onChange={e => setNewBrand({ ...newBrand, email: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                                >
                                    Tạo Thương Hiệu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
