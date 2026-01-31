'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const { isAuthenticated, isAdmin, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    const handleLogout = () => {
        setMobileMenuOpen(false);
        logout();
    };

    return (
    return (
        <>
            <header>
                <div className="container">
                    <div className="header-content">
                        <Link href="/" className="logo">
                            <Image src="/logo.png" alt="Soulishere" width={150} height={50} className="logo-img" style={{ height: '50px', width: 'auto' }} />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="desktop-nav">
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/features">Features</Link></li>
                                {isAuthenticated ? (
                                    <>
                                        <li><Link href="/dashboard">Dashboard</Link></li>
                                        {isAdmin && <li><Link href="/admin">Admin</Link></li>}
                                        <li>
                                            <button onClick={logout}>Logout</button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link href="/login">Login</Link></li>
                                        <li>
                                            <Link href="/signup" className="btn btn-primary btn-small">
                                                Get Started
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <div
                className={`mobile-nav-backdrop ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ zIndex: 9998 }}
            />
            <nav
                className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}
                style={{ zIndex: 9999 }}
            >
                <div className="mobile-nav-header">
                    <Link href="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
                        <Image src="/logo.png" alt="Soulishere" width={120} height={40} className="logo-img" style={{ height: '45px', width: 'auto' }} />
                    </Link>
                    <button
                        className="mobile-nav-close"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ul className="mobile-nav-links">
                    <li><Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/features" onClick={() => setMobileMenuOpen(false)}>Features</Link></li>
                    {isAuthenticated ? (
                        <>
                            <li><Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                            {isAdmin && <li><Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</Link></li>}
                            <li>
                                <button onClick={handleLogout} className="mobile-nav-logout">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                            <li>
                                <Link href="/signup" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ width: '100%', textAlign: 'center' }}>
                                    Get Started
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}
