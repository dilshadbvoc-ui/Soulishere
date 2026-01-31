'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';

function CreateMemorialContent() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('id');

    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(!!editId);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        deathDate: '',
        profilePicture: '',
        coverPicture: '',
        biography: '',
        lifeSummary: '',
        achievements: '',
        profession: '',
        website: '',
        youtubeVideos: [],
        galleryPhotos: [],
        familyMembers: [],
        lifeEvents: []
    });

    useEffect(() => {
        const fetchMemorial = async () => {
            if (!editId) return;

            try {
                const res = await axios.get(`/api/memorials/${editId}`);
                const data = res.data.data;

                // Format dates to YYYY-MM-DD for input fields
                const formatDate = (dateString) => {
                    if (!dateString) return '';
                    return new Date(dateString).toISOString().split('T')[0];
                };

                setFormData({
                    ...data,
                    birthDate: formatDate(data.birthDate),
                    deathDate: formatDate(data.deathDate),
                    // Ensure arrays exists
                    youtubeVideos: data.youtubeVideos || [],
                    galleryPhotos: data.galleryPhotos || [],
                    familyMembers: data.familyMembers || [],
                    lifeEvents: (data.lifeEvents || []).map(event => ({
                        ...event,
                        date: formatDate(event.date)
                    }))
                });
            } catch (err) {
                console.error('Error fetching memorial:', err);
                alert('Failed to load memorial data');
                router.push('/dashboard');
            } finally {
                setDataLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchMemorial();
        }
    }, [editId, isAuthenticated, router]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [authLoading, isAuthenticated, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('image', file);

        try {
            const res = await axios.post('/api/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFormData({ ...formData, [field]: res.data.data.url });
        } catch (err) {
            console.error('Upload error:', err);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const addFamilyMember = () => {
        setFormData({
            ...formData,
            familyMembers: [...formData.familyMembers, { relationship: '', name: '', dates: '' }]
        });
    };

    const removeFamilyMember = (index) => {
        const updated = formData.familyMembers.filter((_, i) => i !== index);
        setFormData({ ...formData, familyMembers: updated });
    };

    const updateFamilyMember = (index, field, value) => {
        const updated = [...formData.familyMembers];
        updated[index][field] = value;
        setFormData({ ...formData, familyMembers: updated });
    };

    const addLifeEvent = () => {
        setFormData({
            ...formData,
            lifeEvents: [...formData.lifeEvents, { title: '', date: '', description: '' }]
        });
    };

    const removeLifeEvent = (index) => {
        const updated = formData.lifeEvents.filter((_, i) => i !== index);
        setFormData({ ...formData, lifeEvents: updated });
    };

    const updateLifeEvent = (index, field, value) => {
        const updated = [...formData.lifeEvents];
        updated[index][field] = value;
        setFormData({ ...formData, lifeEvents: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Manual validation backing up HTML5 required
        if (!formData.birthDate || !formData.deathDate) {
            alert('Please fill in both birth and death dates');
            return;
        }

        setLoading(true);

        try {
            let res;
            if (editId) {
                // Update existing
                res = await axios.put(`/api/memorials/${editId}`, formData);
                alert('Memorial updated successfully');
            } else {
                // Create new
                res = await axios.post('/api/memorials', formData);
            }
            router.push(`/memorial/${res.data.data._id}`);
        } catch (err) {
            console.error('Error saving memorial:', err);
            alert(err.response?.data?.message || 'Failed to save memorial');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || dataLoading) return <LoadingSpinner />;

    return (
        <div className="create-memorial" style={{ padding: '7rem 0 4rem', background: 'var(--lavender-blush)', minHeight: '100vh' }}>
            <div className="container">
                <h1>{editId ? 'Edit Memorial' : 'Create Memorial'}</h1>
                <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
                    {editId ? 'Update the details below.' : 'Fill in the details below to create a beautiful memorial for your loved one.'}
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="form-section" style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h2>Basic Information</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div className="form-group">
                                <label>First Name *</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Last Name *</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Birth Date *</label>
                                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Death Date *</label>
                                <input type="date" name="deathDate" value={formData.deathDate} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Profession</label>
                                <input type="text" name="profession" value={formData.profession} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input type="url" name="website" value={formData.website} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Photos */}
                    <div className="form-section" style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h2>Photos</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Profile Picture</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profilePicture')} />
                                {formData.profilePicture && (
                                    <Image
                                        src={formData.profilePicture}
                                        alt="Profile"
                                        width={100}
                                        height={100}
                                        unoptimized
                                        style={{ width: '100px', height: 'auto', marginTop: '0.5rem', borderRadius: '8px' }}
                                    />
                                )}
                            </div>
                            <div className="form-group">
                                <label>Cover Picture</label>
                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'coverPicture')} />
                                {formData.coverPicture && (
                                    <Image
                                        src={formData.coverPicture}
                                        alt="Cover"
                                        width={200}
                                        height={112}
                                        unoptimized
                                        style={{ width: '200px', height: 'auto', marginTop: '0.5rem', borderRadius: '8px' }}
                                    />
                                )}
                            </div>
                        </div>
                        {uploading && <p>Uploading...</p>}
                    </div>

                    {/* Biography */}
                    <div className="form-section" style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h2>Story</h2>
                        <div className="form-group">
                            <label>Biography</label>
                            <textarea name="biography" value={formData.biography} onChange={handleChange} rows={5} placeholder="Share the story of their life..." />
                        </div>
                        <div className="form-group">
                            <label>Life Summary</label>
                            <textarea name="lifeSummary" value={formData.lifeSummary} onChange={handleChange} rows={3} />
                        </div>
                        <div className="form-group">
                            <label>Achievements</label>
                            <textarea name="achievements" value={formData.achievements} onChange={handleChange} rows={3} />
                        </div>
                    </div>

                    {/* Family Members */}
                    <div className="form-section" style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h2>Family Members</h2>
                        {formData.familyMembers.map((member, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                                    <label>Relationship</label>
                                    <input type="text" value={member.relationship} onChange={(e) => updateFamilyMember(i, 'relationship', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                                    <label>Name</label>
                                    <input type="text" value={member.name} onChange={(e) => updateFamilyMember(i, 'name', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                                    <label>Dates</label>
                                    <input type="text" value={member.dates} onChange={(e) => updateFamilyMember(i, 'dates', e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-secondary btn-small" onClick={() => removeFamilyMember(i)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={addFamilyMember}>
                            <FaPlus /> Add Family Member
                        </button>
                    </div>

                    {/* Life Events */}
                    <div className="form-section" style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h2>Life Events</h2>
                        {formData.lifeEvents.map((event, i) => (
                            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                                    <label>Title</label>
                                    <input type="text" value={event.title} onChange={(e) => updateLifeEvent(i, 'title', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ flex: 1, minWidth: '150px' }}>
                                    <label>Date</label>
                                    <input type="date" value={event.date} onChange={(e) => updateLifeEvent(i, 'date', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ flex: 2, minWidth: '200px' }}>
                                    <label>Description</label>
                                    <input type="text" value={event.description} onChange={(e) => updateLifeEvent(i, 'description', e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-secondary btn-small" onClick={() => removeLifeEvent(i)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={addLifeEvent}>
                            <FaPlus /> Add Life Event
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => router.push('/dashboard')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? (editId ? 'Updating...' : 'Creating...') : (editId ? 'Update Memorial' : 'Create Memorial (Draft)')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function CreateMemorial() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CreateMemorialContent />
        </Suspense>
    );
}
