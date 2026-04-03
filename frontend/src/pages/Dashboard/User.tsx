import { useState, useEffect } from 'react';
import api from '../../api/client';
import { useAuth } from '../../contexts/AuthContext';
import { Layout } from '../../components/Layout';

const UserDashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState({ tags: '', description: '' });
    const [avail, setAvail] = useState([]);
    const [newAvail, setNewAvail] = useState({ date: '', start: '', end: '' });

    useEffect(() => {
        if (user) {
            api.get('/users').then(r => console.log('Users', r.data)); // placeholder
            api.get('/availability').then(r => setAvail(r.data));
        }
    }, [user]);

    const handleProfileSave = async () => {
        const tags = profile.tags.split(',').map(t => t.trim()).filter(Boolean);
        // PUT /profile {tags, description}
        console.log('Save profile', { tags, description: profile.description });
    };

    const handleAddAvail = async () => {
        await api.post('/availability', newAvail);
        setNewAvail({ date: '', start: '', end: '' });
        // reload avail
    };

    return (
        <Layout title="User Dashboard">
            <div className="p-6">

                <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="mb-4">
                        <label>Tags (comma separated)</label>
                        <input value={profile.tags} onChange={e => setProfile({ ...profile, tags: e.target.value })} className="w-full p-2 border rounded" />
                    </div>
                    <div className="mb-4">
                        <label>Description</label>
                        <textarea value={profile.description} onChange={e => setProfile({ ...profile, description: e.target.value })} className="w-full p-2 border rounded" rows={3} />
                    </div>
                    <button onClick={handleProfileSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Profile</button>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-6">Availability</h2>
                <div className="bg-white p-6 rounded-lg shadow mb-4">
                    <div className="grid grid-cols-3 gap-4">
                        <input placeholder="Date YYYY-MM-DD" value={newAvail.date} onChange={e => setNewAvail({ ...newAvail, date: e.target.value })} className="p-2 border rounded" />
                        <input placeholder="Start HH:MM" value={newAvail.start} onChange={e => setNewAvail({ ...newAvail, start: e.target.value })} className="p-2 border rounded" />
                        <input placeholder="End HH:MM" value={newAvail.end} onChange={e => setNewAvail({ ...newAvail, end: e.target.value })} className="p-2 border rounded" />
                    </div>
                    <button onClick={handleAddAvail} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Availability</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3>Your Availability</h3>
                    <pre>{JSON.stringify(avail, null, 2)}</pre>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;

