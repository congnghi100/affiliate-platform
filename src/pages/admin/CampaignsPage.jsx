import { useState } from 'react';
import { useBrandStore } from '../../stores/brandStore';
import { Plus, Search, Edit2, Trash2, X, Calendar, ShoppingBag, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import clsx from 'clsx';

export const CampaignsPage = () => {
    const { campaigns, services, addCampaign, updateCampaign, deleteCampaign } = useBrandStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        services: [],
        startDate: '',
        status: 'Pending',
        image: '',
        link: ''
    });

    const handleOpenModal = (campaign = null) => {
        if (campaign) {
            setEditingCampaign(campaign);
            setFormData(campaign);
        } else {
            setEditingCampaign(null);
            setFormData({ name: '', services: [], startDate: '', status: 'Pending', image: '', link: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCampaign(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const campaignData = { ...formData };

        if (editingCampaign) {
            updateCampaign(editingCampaign.id, campaignData);
        } else {
            addCampaign(campaignData);
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa chiến dịch này?')) {
            deleteCampaign(id);
        }
    };

    const toggleServiceSelection = (serviceId) => {
        const currentServices = formData.services || [];
        if (currentServices.includes(serviceId)) {
            setFormData({ ...formData, services: currentServices.filter(id => id !== serviceId) });
        } else {
            setFormData({ ...formData, services: [...currentServices, serviceId] });
        }
    };

    const filteredCampaigns = campaigns.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Chiến Dịch</h1>
                    <p className="text-slate-500">Tạo và theo dõi các chiến dịch tiếp thị</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> Tạo Chiến Dịch
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm chiến dịch..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid View for Campaigns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        {/* Campaign Image */}
                        <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                            {campaign.image ? (
                                <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-4 left-4">
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
                                    campaign.status === 'Running' ? "bg-emerald-500 text-white" :
                                        campaign.status === 'Paused' ? "bg-amber-500 text-white" : "bg-slate-500 text-white"
                                )}>
                                    {campaign.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{campaign.name}</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => handleOpenModal(campaign)} className="p-1 text-slate-400 hover:text-blue-600 transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(campaign.id)} className="p-1 text-slate-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-500 mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-slate-400" />
                                    <span>Bắt đầu: {campaign.startDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShoppingBag size={16} className="text-slate-400" />
                                    <span>Áp dụng: {campaign.services?.length || 0} dịch vụ</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <a
                                    href={campaign.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 font-medium text-xs flex items-center gap-1 hover:underline"
                                >
                                    <LinkIcon size={14} /> Link chiến dịch
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">
                                {editingCampaign ? 'Cập Nhật Chiến Dịch' : 'Tạo Chiến Dịch Mới'}
                            </h3>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Chiến Dịch</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ngày Bắt Đầu</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <select
                                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Pending">Chờ duyệt</option>
                                        <option value="Running">Đang chạy</option>
                                        <option value="Paused">Tạm dừng</option>
                                        <option value="Ended">Kết thúc</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link Ảnh Banner (Avatar)</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link Chiến Dịch</label>
                                <input
                                    type="url"
                                    placeholder="https://beauty.com/promo"
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                                    value={formData.link}
                                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Áp Dụng Cho Dịch Vụ</label>
                                <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-100 rounded-lg p-2">
                                    {services.map(service => (
                                        <label key={service.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.services?.includes(service.id)}
                                                onChange={() => toggleServiceSelection(service.id)}
                                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-slate-700">{service.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-colors"
                                >
                                    {editingCampaign ? 'Cập Nhật' : 'Tạo Mới'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
