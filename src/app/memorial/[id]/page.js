'use client';

import { useState, useEffect, use } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaHeart, FaCalendar, FaBriefcase, FaGlobe, FaUsers, FaBook, FaImages, FaVideo, FaQrcode } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import QRCode from 'react-qr-code';
import LoadingSpinner from '@/components/LoadingSpinner';
import Modal from '@/components/Modal';

export default function MemorialView({ params }) {
    const { id } = use(params);
    const { isAdmin, user } = useAuth();
    const [memorial, setMemorial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('about');
    const [hugCount, setHugCount] = useState(0);
    const [guestbookForm, setGuestbookForm] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [generatingQR, setGeneratingQR] = useState(false);

    useEffect(() => {
        const fetchMemorial = async () => {
            try {
                const res = await axios.get(`/api/memorials/${id}`);
                setMemorial(res.data.data);
                setHugCount(res.data.data.hugCount || 0);
            } catch (err) {
                console.error('Error fetching memorial:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMemorial();
    }, [id]);

    const handleHug = async () => {
        try {
            const res = await axios.post(`/api/memorials/${id}/hug`);
            setHugCount(res.data.hugCount);
        } catch (err) {
            console.error('Error adding hug:', err);
        }
    };

    const handleGenerateQR = async () => {
        if (!isAdmin) return;
        setGeneratingQR(true);
        try {
            const res = await axios.post(`/api/memorials/${id}/qr`);
            setMemorial({ ...memorial, qrGenerated: true });
            setShowQRModal(true);
        } catch (err) {
            console.error('Error generating QR code:', err);
            alert(err.response?.data?.message || 'Failed to generate QR Code');
        } finally {
            setGeneratingQR(false);
        }
    };

    // TEMPORARY DEBUG: Check Admin Status
    console.log('DEBUG: Memorial View State:', {
        isAdmin,
        memorialId: id,
        memorialName: memorial?.firstName,
        qrGenerated: memorial?.qrGenerated,
        role: isAdmin ? 'admin' : 'user'
    });

    const handleGuestbookSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`/api/memorials/${id}/guestbook`, guestbookForm);
            setGuestbookForm({ name: '', email: '', message: '' });
            // Refetch memorial to get updated guestbook
            const res = await axios.get(`/api/memorials/${id}`);
            setMemorial(res.data.data);
        } catch (err) {
            console.error('Error submitting guestbook entry:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) return <LoadingSpinner />;
    if (!memorial) return <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>Memorial not found</div>;

    const memorialUrl = typeof window !== 'undefined' ? `${window.location.origin}/memorial/${id}` : '';

    return (
        <div className="memorial-view">
            <div className="container">
                {/* Hero Section */}
                <div className="memorial-hero">
                    {memorial.profilePicture && (
                        <Image
                            src={memorial.profilePicture}
                            alt={`${memorial.firstName} ${memorial.lastName}`}
                            width={150}
                            height={150}
                            className="memorial-profile-img"
                            unoptimized
                            style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: '4px solid white',
                                marginBottom: '1rem'
                            }}
                        />
                    )}
                    <h1>{memorial.firstName} {memorial.lastName}</h1>
                    <p className="memorial-dates" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>
                        {formatDate(memorial.birthDate)} — {formatDate(memorial.deathDate)}
                    </p>
                    {memorial.profession && (
                        <p style={{ color: 'rgba(255,255,255,0.8)' }}><FaBriefcase /> {memorial.profession}</p>
                    )}
                    <div className="hug-counter" onClick={handleHug} style={{ cursor: 'pointer' }}>
                        <FaHeart /> <span>{hugCount} Hugs</span>
                    </div>

                </div>

                {/* Admin QR Code Button - Moved outside Hero for visibility */}
                {isAdmin && (
                    <div style={{ margin: '2rem 0', textAlign: 'center' }}>
                        <button
                            className="btn btn-primary"
                            onClick={memorial.qrGenerated ? () => setShowQRModal(true) : handleGenerateQR}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                zIndex: 100
                            }}
                            disabled={generatingQR}
                        >
                            <FaQrcode />
                            {generatingQR ? 'Generating...' : (memorial.qrGenerated ? 'View QR Code' : 'Generate QR Code')}
                        </button>
                    </div>
                )}

                {/* QR Code Modal */}
                {showQRModal && (
                    <Modal isOpen={showQRModal} onClose={() => setShowQRModal(false)} title="Memorial QR Code">
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                <QRCode value={memorialUrl} size={256} />
                            </div>
                            <p style={{ marginTop: '1.5rem', color: 'var(--gray)' }}>
                                Scan to visit this memorial page.
                            </p>
                            <a
                                href={memorialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', marginTop: '1rem', color: 'var(--deep-purple)', wordBreak: 'break-all' }}
                            >
                                {memorialUrl}
                            </a>
                        </div>
                    </Modal>
                )}

                {/* Tabs */}
                <div className="memorial-tabs">
                    <button className={`tab ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
                        <FaBook /> About
                    </button>
                    <button className={`tab ${activeTab === 'family' ? 'active' : ''}`} onClick={() => setActiveTab('family')}>
                        <FaUsers /> Family
                    </button>
                    <button className={`tab ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
                        <FaImages /> Gallery
                    </button>
                    <button className={`tab ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>
                        <FaVideo /> Videos
                    </button>
                    <button className={`tab ${activeTab === 'guestbook' ? 'active' : ''}`} onClick={() => setActiveTab('guestbook')}>
                        <FaHeart /> Guest Book
                    </button>
                </div>

                {/* Tab Content */}
                <div className="memorial-tab-content">
                    {activeTab === 'about' && (
                        <div>
                            <h2>Biography</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{memorial.biography || 'No biography available.'}</p>

                            {memorial.lifeSummary && (
                                <>
                                    <h3 style={{ marginTop: '2rem' }}>Life Summary</h3>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{memorial.lifeSummary}</p>
                                </>
                            )}

                            {memorial.achievements && (
                                <>
                                    <h3 style={{ marginTop: '2rem' }}>Achievements</h3>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{memorial.achievements}</p>
                                </>
                            )}

                            {memorial.lifeEvents && memorial.lifeEvents.length > 0 && (
                                <>
                                    <h3 style={{ marginTop: '2rem' }}>Life Events</h3>
                                    <div className="timeline">
                                        {memorial.lifeEvents.map((event, i) => (
                                            <div key={i} className="timeline-event">
                                                <div className="timeline-date">{formatDate(event.date)}</div>
                                                <h4>{event.title}</h4>
                                                <p>{event.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'family' && (
                        <div>
                            <h2>Family Tree</h2>
                            {memorial.familyMembers && memorial.familyMembers.length > 0 ? (
                                <div className="family-tree">
                                    {memorial.familyMembers.map((member, i) => (
                                        <div key={i} className="family-member">
                                            <FaUsers />
                                            <div>
                                                <h4>{member.name}</h4>
                                                <p>{member.relationship}</p>
                                                {member.dates && <small>{member.dates}</small>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No family information available.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'gallery' && (
                        <div>
                            <h2>Photo Gallery</h2>
                            {memorial.galleryPhotos && memorial.galleryPhotos.length > 0 ? (
                                <div className="gallery-grid">
                                    {memorial.galleryPhotos.map((photo, i) => (
                                        <div key={i} className="gallery-item">
                                            <Image
                                                src={photo.url}
                                                alt={photo.description || 'Gallery photo'}
                                                width={400}
                                                height={300}
                                                unoptimized
                                                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                                            />
                                            {photo.description && <p>{photo.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No photos in the gallery.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'videos' && (
                        <div>
                            <h2>Videos</h2>
                            {memorial.youtubeVideos && memorial.youtubeVideos.length > 0 ? (
                                <div className="video-grid">
                                    {memorial.youtubeVideos.map((video, i) => (
                                        <div key={i} className="video-item">
                                            <iframe
                                                src={video.url.replace('watch?v=', 'embed/')}
                                                title={video.title}
                                                frameBorder="0"
                                                allowFullScreen
                                                style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px' }}
                                            />
                                            <h4>{video.title}</h4>
                                            {video.description && <p>{video.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No videos available.</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'guestbook' && (
                        <div>
                            <h2>Guest Book</h2>

                            {memorial.status === 'published' && (
                                <form onSubmit={handleGuestbookSubmit} style={{ marginBottom: '2rem' }}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={guestbookForm.name}
                                            onChange={(e) => setGuestbookForm({ ...guestbookForm, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={guestbookForm.email}
                                            onChange={(e) => setGuestbookForm({ ...guestbookForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            placeholder="Share your memory or condolence..."
                                            value={guestbookForm.message}
                                            onChange={(e) => setGuestbookForm({ ...guestbookForm, message: e.target.value })}
                                            required
                                            rows={4}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                                        {submitting ? 'Submitting...' : 'Sign Guest Book'}
                                    </button>
                                </form>
                            )}

                            {memorial.guestBookEntries && memorial.guestBookEntries.length > 0 ? (
                                <div className="guestbook-entries">
                                    {memorial.guestBookEntries.map((entry, i) => (
                                        <div key={i} className="guestbook-entry" style={{
                                            background: 'var(--lavender-blush)',
                                            padding: '1.5rem',
                                            borderRadius: '12px',
                                            marginBottom: '1rem'
                                        }}>
                                            <p style={{ fontStyle: 'italic' }}>&quot;{entry.message}&quot;</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: 'var(--gray)' }}>
                                                <strong>{entry.name}</strong>
                                                <small>{formatDate(entry.date)}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No entries yet. Be the first to sign the guest book.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

