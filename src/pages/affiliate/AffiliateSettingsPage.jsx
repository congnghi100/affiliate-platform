import { useState } from 'react';
import { useAffiliateStore } from '../../stores/affiliateStore';
import { Save, User } from 'lucide-react';

export const AffiliateSettingsPage = () => {
    const { bankInfo, updateBankInfo } = useAffiliateStore();
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        accountName: '',
        branch: '',
        ...bankInfo
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBankInfo(formData);
        alert('Đã lưu thông tin thanh toán thành công!');
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Cài Đặt Tài Khoản</h1>
                <p className="text-slate-500">Quản lý thông tin cá nhân và tài khoản ngân hàng</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card (Mock) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <User size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Demo User</h3>
                        <p className="text-slate-500 text-sm">Affiliate Member</p>
                        <div className="mt-4 w-full">
                            <button className="w-full bg-slate-100 text-slate-600 py-2 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">
                                Đổi Mật Khẩu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bank Form */}
                <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        Thông Tin Nhận Thanh Toán
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Ngân Hàng</label>
                                <select
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={formData.bankName}
                                    onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                                >
                                    <option value="Vietcombank">Vietcombank</option>
                                    <option value="Techcombank">Techcombank</option>
                                    <option value="MB Bank">MB Bank</option>
                                    <option value="ACB">ACB</option>
                                    <option value="VPBank">VPBank</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Chi Nhánh</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={formData.branch}
                                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Số Tài Khoản</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                value={formData.accountNumber}
                                onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tên Chủ Tài Khoản (Không Dấu)</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                value={formData.accountName}
                                onChange={e => setFormData({ ...formData, accountName: e.target.value.toUpperCase() })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors ml-auto"
                            >
                                <Save size={20} /> Lưu Thông Tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
