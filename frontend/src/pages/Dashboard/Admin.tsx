// @ts-nocheck
import { useState, useEffect } from 'react';
import api from '../../api/client';
import { Layout } from '../../components/Layout';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [recs, setRecs] = useState([]);
    const [bookForm, setBookForm] = useState({ mentorId: '', date: '' });

    useEffect(() => {
        api.get('/users').then(r => setUsers(r.data));
        api.get('/mentors').then(r => setMentors(r.data));
    }, []);

    const loadRecs = async (userId: string) => {
        const r = await api.get(`/recommendations/${userId}`);
        setRecs(r.data);
        setSelectedUser(users.find((u: any) => u.id === userId) || null);
    };

    const handleBook = async () => {
        await api.post('/calls', { ...bookForm, userId: selectedUser!.id });
        alert('Booked!');
        setBookForm({ mentorId: '', date: '' });
    };

    return (
        <Layout title="Admin Dashboard">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3>Users ({users.length})</h3>
                        <ul>
                            {users.map((u: any) => (
                                <li key={u.id} className="p-2 hover:bg-gray-100 cursor-pointer rounded" onClick={() => loadRecs(u.id)}>
                                    {u.name} - {u.tags?.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3>Mentors ({mentors.length})</h3>
                        <ul>
                            {mentors.map((m: any) => (
                                <li key={m.id} className="p-2 hover:bg-gray-100">
                                    {m.name} - {m.tags?.join(', ')}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {selectedUser && (
                    <div>
                        <h2>Recommendations for {(selectedUser as any)?.name || 'User'}</h2>
                        <div className="bg-white p-6 rounded-lg shadow mt-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Mentor</th>
                                        <th>Score</th>
                                        <th>Matching Tags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recs.map((r: any) => (
                                        <tr key={r.id}>
                                            <td>{r.name}</td>
                                            <td>{(r.score * 100).toFixed(0)}%</td>
                                            <td>{r.matchingTags?.join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow mt-4">
                            <h3>Book Call</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <select value={bookForm.mentorId} onChange={e => setBookForm({ ...bookForm, mentorId: e.target.value })} className="p-2 border rounded">
                                    <option value="">Select Mentor</option>
                                    {mentors.map((m: any) => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <input placeholder="Date YYYY-MM-DD" value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} className="p-2 border rounded" />
                            </div>
                            <button onClick={handleBook} className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Book Call</button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;

