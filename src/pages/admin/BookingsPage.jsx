import { useState } from 'react';
import { useCRMStore } from '../../stores/crmStore';
import { Search, Calendar, Clock, User, CheckCircle, XCircle, Clock4 } from 'lucide-react';
import clsx from 'clsx';

export const BookingsPage = () => {
    const { bookings, updateBookingStatus } = useCRMStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBookings = bookings.filter(booking =>
        booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return <CheckCircle size={16} className="text-emerald-500" />;
            case 'Cancelled': return <XCircle size={16} className="text-red-500" />;
            case 'Pending': return <Clock4 size={16} className="text-amber-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Lịch Hẹn</h1>
                    <p className="text-slate-500">Theo dõi và quản lý lịch đặt chỗ của khách hàng</p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm theo tên khách hoặc dịch vụ..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-700">Khách Hàng / Dịch Vụ</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Thời Gian</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Người Giới Thiệu</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Trạng Thái</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{booking.customer}</p>
                                            <p className="text-xs text-slate-500">{booking.service}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    <div className="space-y-1 text-sm">
                                        <div className="flex items-center gap-2"><Calendar size={14} /> {booking.date}</div>
                                        <div className="flex items-center gap-2"><Clock size={14} /> {booking.time}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-slate-600 italic">
                                        {booking.affiliate}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(booking.status)}
                                        <span className={clsx(
                                            "text-xs font-bold uppercase",
                                            booking.status === 'Confirmed' && "text-emerald-600",
                                            booking.status === 'Pending' && "text-amber-600",
                                            booking.status === 'Cancelled' && "text-red-600",
                                        )}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {booking.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                                    className="px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors"
                                                >
                                                    Xác Nhận
                                                </button>
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                                    className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors"
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
                                        {booking.status !== 'Pending' && (
                                            <button
                                                onClick={() => updateBookingStatus(booking.id, 'Pending')}
                                                className="px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                Đặt lại
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
    );
};
