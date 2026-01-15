import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Unauthorized</h1>
            <p className="text-slate-600 mb-8">You do not have permission to access this page.</p>
            <Link
                to="/login"
                className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
                Back to Login
            </Link>
        </div>
    );
};
