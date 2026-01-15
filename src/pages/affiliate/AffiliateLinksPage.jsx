import { useState } from 'react';
import { useAffiliateStore } from '../../stores/affiliateStore';
import { useBrandStore } from '../../stores/brandStore';
import { Link as LinkIcon, Copy, Plus, X, Search, ExternalLink } from 'lucide-react';


export const AffiliateLinksPage = () => {
    const { links, generateLink } = useAffiliateStore();
    const { campaigns } = useBrandStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [linkName, setLinkName] = useState('');

    const activeCampaigns = campaigns.filter(c => c.status === 'Running');

    const handleGenerate = (e) => {
        e.preventDefault();
        if (selectedCampaign && linkName) {
            generateLink(linkName, selectedCampaign);
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setLinkName('');
        setSelectedCampaign('');
    };

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        alert('Đã copy link vào clipboard!');
    };

    const filteredLinks = links.filter(link =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (value) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quản Lý Link Giới Thiệu</h1>
                    <p className="text-slate-500">Tạo và chia sẻ link để nhận hoa hồng</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={20} /> Tạo Link Mới
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm link..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                {filteredLinks.map((link) => (
                    <div key={link.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <LinkIcon size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{link.name}</h3>
                                </div>
                                <div className="flex items-center gap-3 ml-2">
                                    <code className="bg-slate-50 px-3 py-1 rounded text-sm text-slate-600 font-mono border border-slate-200">
                                        {link.url}
                                    </code>
                                    <button
                                        onClick={() => handleCopy(link.url)}
                                        className="text-blue-600 hover:text-blue-700 p-1"
                                        title="Copy Link"
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-400 hover:text-slate-600 p-1"
                                        title="Open Link"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-8 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Clicks</p>
                                    <p className="text-lg font-bold text-slate-800">{link.clicks}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Conversions</p>
                                    <p className="text-lg font-bold text-purple-600">{link.conversions}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Earnings</p>
                                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(link.earnings)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">Tạo Link Giới Thiệu Mới</h3>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleGenerate} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Gợi Nhớ</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ: Link Facebook, Link Banner Web..."
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={linkName}
                                    onChange={e => setLinkName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Chọn Chiến Dịch</label>
                                <select
                                    required
                                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    value={selectedCampaign}
                                    onChange={e => setSelectedCampaign(e.target.value)}
                                >
                                    <option value="">-- Chọn chiến dịch đang chạy --</option>
                                    {activeCampaigns.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {activeCampaigns.length === 0 && (
                                    <p className="text-xs text-amber-500 mt-1">Không có chiến dịch nào đang chạy.</p>
                                )}
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
                                    Tạo Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
