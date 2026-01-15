import { useState } from 'react';
import { useAffiliateStore } from '../../stores/affiliateStore';
import { Coins, Clock, CheckCircle, XCircle, ChevronRight, Wallet, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';

export const PayoutsPage = () => {
    const { stats, payouts, requestPayout, bankInfo } = useAffiliateStore();
    const [requestAmount, setRequestAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    const handleRequest = (e) => {
        e.preventDefault();
        const amount = parseInt(requestAmount);
        if (amount > stats.totalEarnings) {
            alert('Số dư không đủ để rút!');
            return;
        }
        if (amount < 50000) {
            alert('Số tiền rút tối thiểu là 50,000đ');
            return;
        }
        requestPayout(amount);
        setIsModalOpen(false);
        setRequestAmount('');
        alert('Yêu cầu thanh toán đã được gửi!');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Thu Nhập</h1>
                    <p className="text-slate-500">Theo dõi dòng tiền và yêu cầu thanh toán</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
                >
                    <Wallet size={20} /> Rút Tiền
                </button>
            </div>

            {/* Wallet Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-slate-400 text-sm font-medium mb-1">Số dư khả dụng</p>
                        <h3 className="text-3xl font-bold">{formatCurrency(stats.totalEarnings)}</h3>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                            <span className="bg-slate-800 px-2 py-1 rounded">Cập nhật lúc 08:00 hôm nay</span>
                        </div>
                    </div>
                    <Wallet size={80} className="absolute -right-4 -bottom-4 text-white/5" />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium mb-1">Đang chờ xử lý</p>
                    <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(stats.pendingPayout)}</h3>
                    <div className="mt-4 flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Clock size={14} /> Dự kiến thanh toán sau 2-3 ngày
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-sm font-medium mb-1">Tổng đã thanh toán</p>
                    <h3 className="text-2xl font-bold text-slate-800">{formatCurrency(6000000)}</h3>
                    <div className="mt-4 flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <CheckCircle size={14} /> Hoàn tất 5 giao dịch
                    </div>
                </div>
            </div>

            {/* Payout History */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Lịch Sử Giao Dịch</h3>
                    <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                        Xem tất cả <ChevronRight size={16} />
                    </button>
                </div>
                <div className="divide-y divide-slate-50">
                    {payouts.map((payout) => (
                        <div key={payout.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={clsx(
                                    "p-3 rounded-full",
                                    payout.status === 'Paid' ? "bg-emerald-50 text-emerald-600" :
                                        payout.status === 'Pending' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                                )}>
                                    <ArrowUpRight size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">Rút tiền về {payout.method}</p>
                                    <p className="text-sm text-slate-500">{payout.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">-{formatCurrency(payout.amount)}</p>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                    {payout.status === 'Paid' && <CheckCircle size={12} className="text-emerald-500" />}
                                    {payout.status === 'Pending' && <Clock size={12} className="text-amber-500" />}
                                    {payout.status === 'Cancelled' && <XCircle size={12} className="text-red-500" />}
                                    <span className={clsx(
                                        "text-xs font-bold uppercase",
                                        payout.status === 'Paid' && "text-emerald-600",
                                        payout.status === 'Pending' && "text-amber-600",
                                        payout.status === 'Cancelled' && "text-red-600",
                                    )}>
                                        {payout.status === 'Paid' ? 'Hoàn thành' :
                                            payout.status === 'Pending' ? 'Đang xử lý' : 'Đã hủy'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payout Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900">Yêu Cầu Rút Tiền</h3>
                        </div>
                        <form onSubmit={handleRequest} className="p-6 space-y-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Nhận qua ngân hàng</p>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold text-slate-900">{bankInfo.bankName}</p>
                                    <p className="text-sm text-slate-600">{bankInfo.accountNumber}</p>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">{bankInfo.accountName}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Số tiền muốn rút (VND)</label>
                                <div className="relative">
                                    <Coins className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="number"
                                        placeholder="Tối thiểu 50,000"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-lg font-bold"
                                        value={requestAmount}
                                        onChange={e => setRequestAmount(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Dư khả dụng: <span className="font-bold text-blue-600">{formatCurrency(stats.totalEarnings)}</span></p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                                >
                                    Gửi Yêu Cầu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
