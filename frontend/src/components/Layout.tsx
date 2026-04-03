import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

export const Layout = ({ title, children }: LayoutProps) => {
    const { logout } = useAuth();

    return (
        <div>
            <nav className="bg-white shadow-lg border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={logout} className="text-red-600 hover:text-red-800 font-medium">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    );
};

