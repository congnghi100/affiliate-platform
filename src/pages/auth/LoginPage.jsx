import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export const LoginPage = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Default redirect to /admin or the page they came from
    const from = location.state?.from?.pathname || '/admin';

    const handleLogin = (role) => {
        login(role);
        // Correctly redirect based on role if no specific 'from' location
        if (!location.state?.from?.pathname) {
            if (role === 'AFFILIATE') navigate('/affiliate');
            else navigate('/admin');
        } else {
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500">Sign in to access your platform</p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('PLATFORM_ADMIN')}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                    >
                        Login as Platform Admin
                    </button>

                    <button
                        onClick={() => handleLogin('BRAND_ADMIN')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                    >
                        Login as Brand Admin
                    </button>

                    <button
                        onClick={() => handleLogin('AFFILIATE')}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                    >
                        Login as Affiliate
                    </button>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    <p className="mb-2">This is a demo login screen. Click any button to simulate authentication.</p>
                    <p>
                        Chưa có tài khoản? <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">Đăng ký Affiliate ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
