// @ts-nocheck
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import UserDashboard from './pages/Dashboard/User';
// @ts-ignore
import MentorDashboard from './pages/Dashboard/Mentor';
// @ts-ignore
import AdminDashboard from './pages/Dashboard/Admin';
import { useEffect } from 'react';

function ProtectedDashboard() {
    const params = useParams();
    const role = params.role as string | undefined;

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !role || !user.role || user.role.toLowerCase() !== role.toLowerCase()) {
            navigate('/login');
        }
    }, [user, role, navigate]);


    if (!user || !role || !user.role || user.role.toLowerCase() !== role.toLowerCase()) return <div>Loading...</div>;


    const renderDashboard = () => {
        if (!role) return <div>No role specified</div>;
        switch (role.toLowerCase()) {

            case 'user':
                return <UserDashboard />;
            case 'mentor':
                return <MentorDashboard />;
            case 'admin':
                return <AdminDashboard />;
            default:
                return <div>Invalid role</div>;
        }
    };

    return renderDashboard();
}

function AppContent() {
    // const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/:role/*" element={<ProtectedDashboard />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;

