'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { FaUsers, FaBook, FaMoneyBill, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPanel() {
    const { isAuthenticated, isAdmin, loading: authLoading, token } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [memorials, setMemorials] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('memorials');

    useEffect(() => {
        if (!authLoading && (!isAuthenticated || !isAdmin)) {
            router.push('/dashboard');
        }
    }, [authLoading, isAuthenticated, isAdmin, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isAdmin) return;

            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const [statsRes, memorialsRes, usersRes] = await Promise.all([
                    axios.get('/api/admin/stats', config),
                    axios.get('/api/admin/memorials', config),
                    axios.get('/api/admin/users', config)
                ]);
                setStats(statsRes.data.data);
                setMemorials(memorialsRes.data.data || []);
                setUsers(usersRes.data.data || []);
            } catch (err) {
                console.error('Error fetching admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const handleDeleteMemorial = async (id) => {
        if (!confirm('Are you sure you want to delete this memorial? This action cannot be undone.')) {
            return;
        }

        try {
            await axios.delete(`/api/memorials/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMemorials(memorials.filter(m => m._id !== id));
            alert('Memorial deleted successfully');
        } catch (err) {
            console.error('Error deleting memorial:', err);
            alert('Failed to delete memorial');
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (authLoading || loading) return <LoadingSpinner />;
    if (!isAdmin) return null;

    return (
        <div className="admin-panel" style={{ padding: '7rem 0 4rem', background: 'var(--lavender-blush)', minHeight: '100vh' }}>
            <div className="container">
                <h1>Admin Dashboard</h1>

                {/* Stats Cards */}
                {stats && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <FaUsers style={{ fontSize: '2rem', color: 'var(--deep-purple)', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.totalUsers}</h3>
                            <p style={{ color: 'var(--gray)', margin: 0 }}>Total Users</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <FaBook style={{ fontSize: '2rem', color: 'var(--deep-purple)', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.totalMemorials}</h3>
                            <p style={{ color: 'var(--gray)', margin: 0 }}>Total Memorials</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <FaEye style={{ fontSize: '2rem', color: 'var(--deep-purple)', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{stats.publishedMemorials}</h3>
                            <p style={{ color: 'var(--gray)', margin: 0 }}>Published</p>
                        </div>
                        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <FaMoneyBill style={{ fontSize: '2rem', color: 'var(--deep-purple)', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>₹{(stats.totalRevenue || 0).toLocaleString()}</h3>
                            <p style={{ color: 'var(--gray)', margin: 0 }}>Total Revenue</p>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <button
                        className={`btn ${activeTab === 'memorials' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('memorials')}
                    >
                        Memorials
                    </button>
                    <button
                        className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                </div>

                {/* Content Area */}
                <div style={{ background: 'white', padding: '2rem', borderRadius: '16px' }}>

                    {/* Memorials Tab */}
                    {activeTab === 'memorials' && (
                        <>
                            <h2 style={{ marginBottom: '1.5rem' }}>All Memorials</h2>
                            {memorials.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--gray)' }}>No memorials found.</p>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--lavender-blush)' }}>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Name</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Created By</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Status</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Created</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {memorials.map((memorial) => (
                                                <tr key={memorial._id} style={{ borderBottom: '1px solid var(--lavender-blush)' }}>
                                                    <td style={{ padding: '1rem' }}>{memorial.firstName} {memorial.lastName}</td>
                                                    <td style={{ padding: '1rem' }}>{memorial.userId?.name || 'Unknown'}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            background: memorial.status === 'published' ? 'var(--deep-purple)' : 'var(--gray)',
                                                            color: 'white',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '12px',
                                                            fontSize: '0.85rem'
                                                        }}>
                                                            {memorial.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>{formatDate(memorial.createdAt)}</td>
                                                    <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                        <Link href={`/memorial/${memorial._id}`} className="btn btn-secondary btn-small" title="View">
                                                            <FaEye />
                                                        </Link>
                                                        <Link href={`/create-memorial?id=${memorial._id}`} className="btn btn-primary btn-small" title="Edit">
                                                            <FaEdit />
                                                        </Link>
                                                        <button
                                                            className="btn btn-secondary btn-small"
                                                            onClick={() => handleDeleteMemorial(memorial._id)}
                                                            title="Delete"
                                                            style={{ background: '#ffebee', color: '#d32f2f', border: 'none' }}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <>
                            <h2 style={{ marginBottom: '1.5rem' }}>All Users</h2>
                            {users.length === 0 ? (
                                <p style={{ textAlign: 'center', color: 'var(--gray)' }}>No users found.</p>
                            ) : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--lavender-blush)' }}>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Name</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Email</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Role</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Joined</th>
                                                <th style={{ textAlign: 'left', padding: '1rem' }}>Auth Method</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id} style={{ borderBottom: '1px solid var(--lavender-blush)' }}>
                                                    <td style={{ padding: '1rem' }}>{user.name}</td>
                                                    <td style={{ padding: '1rem' }}>{user.email}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        <span style={{
                                                            background: user.role === 'admin' ? 'var(--deep-purple)' : 'var(--lavender-blush)',
                                                            color: user.role === 'admin' ? 'white' : 'var(--text-dark)',
                                                            padding: '0.25rem 0.75rem',
                                                            borderRadius: '12px',
                                                            fontSize: '0.85rem'
                                                        }}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '1rem' }}>{formatDate(user.createdAt)}</td>
                                                    <td style={{ padding: '1rem' }}>
                                                        {user.googleId ? 'Google' : 'Email/Password'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
