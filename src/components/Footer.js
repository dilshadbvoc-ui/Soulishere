import Link from 'next/link';
import { FaHeart, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link href="/" className="logo">
                            <Image src="/logo.png" alt="Soulishere" width={50} height={50} style={{ height: '40px', width: 'auto', marginRight: '10px', verticalAlign: 'middle' }} />
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', verticalAlign: 'middle' }}>Soulishere</span>
                        </Link>
                        <p>Preserving memories, celebrating lives.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/features">Features</Link></li>
                            <li><Link href="/signup">Create Memorial</Link></li>
                            <li><Link href="/login">Login</Link></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="#" aria-label="Facebook"><FaFacebook /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Made with <FaHeart className="heart-icon" /> for those we love</p>
                    <p>&copy; {new Date().getFullYear()} Soulishere. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

