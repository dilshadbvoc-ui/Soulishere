import Link from 'next/link';
import { FaPalette, FaMousePointer, FaShareAlt, FaComments, FaInfinity, FaQrcode, FaUsers, FaClock, FaCheck } from 'react-icons/fa';

export default function Features() {
    const features = [
        { icon: FaPalette, title: 'Beautiful Design', description: "Professional, elegant memorial pages that celebrate your loved one's unique story with stunning visuals." },
        { icon: FaMousePointer, title: 'Easy to Create', description: 'Simple step-by-step process - no technical skills needed. Create a memorial in minutes.' },
        { icon: FaShareAlt, title: 'Share Instantly', description: 'Generate QR codes and share with one link. Perfect for memorial services and family gatherings.' },
        { icon: FaComments, title: 'Guest Book', description: 'Invite friends and family to leave condolences, share memories, and celebrate together.' },
        { icon: FaInfinity, title: 'Forever Preserved', description: 'Your memorial lives forever on our platform. A lasting digital tribute.' },
        { icon: FaQrcode, title: 'QR Code Generation', description: 'Unique QR codes for each memorial that can be printed and displayed.' },
        { icon: FaUsers, title: 'Family Tree', description: 'Document family relationships and connections beautifully.' },
        { icon: FaClock, title: 'Life Timeline', description: 'Create an interactive timeline of life events and milestones.' }
    ];

    return (
        <div className="features-page" style={{ paddingTop: '100px' }}>
            {/* Hero */}
            <div style={{
                background: 'linear-gradient(135deg, var(--mauve-mist), var(--deep-purple))',
                color: 'white',
                padding: '4rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--deep-purple)' }}>Features that celebrate your loved one&apos;s life</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.95, maxWidth: '600px', margin: '0 auto' }}>
                        Everything you need to create a beautiful, lasting tribute for your loved ones.
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{ padding: '4rem 0', background: 'white' }}>
                <div className="container">
                    <div className="feature-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-card">
                                <f.icon style={{ fontSize: '3rem', color: 'var(--deep-purple)', marginBottom: '1.5rem' }} />
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* What's Included */}
            <div style={{ padding: '4rem 0', background: 'var(--lavender-blush)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>What&apos;s Included</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Profile & Media</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Profile & cover photos</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Photo gallery</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> YouTube video embedding</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Biography section</li>
                            </ul>
                        </div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Life Story</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Life summary</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Achievements</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Timeline of life events</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Family tree</li>
                            </ul>
                        </div>
                        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Sharing & Interaction</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Shareable link</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> QR code generation</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Guest book</li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCheck style={{ color: 'var(--deep-purple)' }} /> Hug counter</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div style={{ padding: '4rem 0', background: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2>Ready to Create a Memorial?</h2>
                    <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
                        Start preserving precious memories today.
                    </p>
                    <Link href="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Get Started Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
