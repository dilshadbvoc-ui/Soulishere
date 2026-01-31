'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import MemorialCard from '@/components/MemorialCard';
import LoadingSpinner from '@/components/LoadingSpinner';

function DashboardContent() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [memorials, setMemorials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const router = useRouter();
    const searchParams = useSearchParams();
    const tokenParam = searchParams.get('token');

    // Handle Google Auth Token
    useEffect(() => {
        if (tokenParam) {
            localStorage.setItem('token', tokenParam);
            // Clear URL and reload to initialize AuthContext with new token
            window.location.href = '/dashboard';
        }
    }, [tokenParam]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated && !tokenParam) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router, tokenParam]);

    useEffect(() => {
        const fetchMemorials = async () => {
            if (!isAuthenticated) return;

            try {
                const res = await axios.get('/api/memorials');
                setMemorials(res.data.data || []);
            } catch (err) {
                console.error('Error fetching memorials:', err);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchMemorials();
        }
    }, [isAuthenticated]);

    if (tokenParam) return <LoadingSpinner />; // Show loading while processing token

    if (authLoading || loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return null;
    }

    const filteredMemorials = memorials.filter(m => {
        if (activeTab === 'all') return true;
        if (activeTab === 'published') return m.status === 'published';
        if (activeTab === 'drafts') return m.status === 'draft';
        return true;
    });

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1>Welcome, {user?.name}</h1>
                    <Link href="/create-memorial" className="btn btn-primary">
                        Create New Memorial
                    </Link>
                </div>

                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Memorials ({memorials.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'published' ? 'active' : ''}`}
                        onClick={() => setActiveTab('published')}
                    >
                        Published ({memorials.filter(m => m.status === 'published').length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'drafts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('drafts')}
                    >
                        Drafts ({memorials.filter(m => m.status === 'draft').length})
                    </button>
                </div>

                {filteredMemorials.length === 0 ? (
                    <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <h3>No memorials yet</h3>
                        <p>Create your first memorial to get started.</p>
                        <Link href="/create-memorial" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                            Create Memorial
                        </Link>
                    </div>
                ) : (
                    <div className="memorial-grid">
                        {filteredMemorials.map(memorial => (
                            <MemorialCard key={memorial._id} memorial={memorial} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <DashboardContent />
        </Suspense>
    );
}
