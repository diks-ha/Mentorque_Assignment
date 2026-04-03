import { useState, useEffect } from 'react';
import api from '../../api/client';
import { useAuth } from '../../contexts/AuthContext';
import { Layout } from '../../components/Layout';

const MentorDashboard = () => {
    const { user } = useAuth();
    const [avail, setAvail] = useState([]);
    const [newAvail, setNewAvail] = useState({ date: '', start: '', end: '' });

    useEffect(() => {
        if (user) {
            api.get('/availability').then(r => setAvail(r.data));
        }
    }, [user]);

    const handleAddAvail = async () => {
        await api.post('/availability', newAvail);
        setNewAvail({ date: '', start: '', end: '' });
        // reload
        api.get('/availability').then(r => setAvail(r.data));
    };

    const handleDelete = async (id: string) => {
        await api.delete(`/availability/${id}`);
        api.get('/availability').then(r => setAvail(r.data));
    };

    return (
        <Layout title="Mentor Dashboard">
            <div className="p-6">

                <h2 className="text-2xl font-bold mb-6">Manage Availability</h2>
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <input placeholder="Date YYYY-MM-DD" value={newAvail.date} onChange={e => setNewAvail({ ...newAvail, date: e.target.value })} className="p-2 border rounded" />
                        <input placeholder="Start HH:MM" value={newAvail.start} onChange={e => setNewAvail({ ...newAvail, start: e.target.value })} className="p-2 border rounded" />
                        <input placeholder="End HH:MM" value={newAvail.end} onChange={e => setNewAvail({ ...newAvail, end: e.target.value })} className="p-2 border rounded" />
                    </div>
                    <button onClick={handleAddAvail} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Slot</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3>Current Slots</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {avail.map((a: any) => (
                                    <tr key={a.id}>
                                        <td>{a.date}</td>
                                        <td>{a.start}</td>
                                        <td>{a.end}</td>
                                        <td><button onClick={() => handleDelete(a.id)} className="text-red-600 hover:text-red-800">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MentorDashboard;

