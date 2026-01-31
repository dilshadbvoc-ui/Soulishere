'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPalette, FaMousePointer, FaShareAlt, FaComments, FaInfinity, FaChevronDown, FaCheck } from 'react-icons/fa';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [sampleMemorialId, setSampleMemorialId] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    const fetchSampleMemorial = async () => {
      try {
        const res = await axios.get('/api/memorials/sample');
        if (res.data.success && res.data.data) {
          setSampleMemorialId(res.data.data._id);
        }
      } catch {
        console.log('No sample memorial available');
      }
    };
    const fetchSettings = async () => {
      try {
        const res = await axios.get('/api/site-settings');
        if (res.data.success) {
          setSiteSettings(res.data.data);
        }
      } catch (e) {
        console.error('Failed to fetch settings');
      }
    };
    fetchSampleMemorial();
    fetchSettings();
  }, []);

  const toggleFAQ = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    { icon: FaPalette, title: 'Beautiful Design', description: "Professional, elegant memorial pages that celebrate your loved one's unique story." },
    { icon: FaMousePointer, title: 'Easy to Create', description: 'Simple step-by-step process - no technical skills needed.' },
    { icon: FaShareAlt, title: 'Share Instantly', description: 'Generate QR codes and share with one link.' },
    { icon: FaComments, title: 'Guest Interaction', description: 'Invite friends and family to leave condolences and share memories.' },
    { icon: FaInfinity, title: 'Permanent Home', description: 'Your memorial lives forever on our platform.' }
  ];

  const howItWorks = [
    { step: 1, title: 'Sign Up & Create Profile', description: 'Create your free account in seconds.' },
    { step: 2, title: 'Add Memorial Details', description: 'Fill in details with photos, stories, and life events.' },
    { step: 3, title: 'Personalize & Customize', description: 'Add family information, timeline, and upload photos.' },
    { step: 4, title: 'Generate QR Code', description: 'Create a shareable QR code and link.' },
    { step: 5, title: 'Receive Condolences', description: 'Watch as friends and family add memories.' }
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Mumbai, India', text: 'This platform helped us create a beautiful tribute for my grandmother. The QR code feature is amazing.', image: '/images/testimonial_1.png' },
    { name: 'Rahul Verma', role: 'Delhi, India', text: 'Easy to use and the memorial page looks so professional. Our whole family contributed memories.', image: '/images/testimonial_2.png' },
    { name: 'Anjali Patel', role: 'Bangalore, India', text: 'The guest book feature lets everyone share their stories. It means so much to our family.', image: '/images/testimonial_3.png' }
  ];

  const faqs = [
    { q: 'What can I include in a memorial?', a: "You can include the person's full name, birth and death dates, biographical information, photos, videos, family members, life events and milestones, achievements, and personal website links." },
    { q: 'Is my memorial permanent?', a: 'Yes! Your memorial remains on our platform indefinitely. As long as you maintain an active account, the memorial will be preserved.' },
    { q: 'How do I share the memorial?', a: 'Admins can generate unique QR codes that link directly to the memorial. You can print the QR code, email it, or display it at memorial services.' },
    { q: 'Can people add memories after it\'s published?', a: 'Absolutely! Visitors can sign the digital guest book to leave condolences, memories, and tributes anytime.' },
    { q: 'Can I edit a memorial after publishing?', a: 'Yes! As the creator, you can edit any part of the memorial anytime.' }
  ];

  return (
    <section id="homeSection">
      {/* Hero Section */}
      <div className="hero" style={{
        background: 'linear-gradient(135deg, var(--white) 0%, var(--lavender-blush) 100%)',
        padding: '4rem 0',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h1 style={{ color: 'var(--deep-purple)', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Celebrate a Life,<br />Preserve a Legacy
              </h1>
              <p style={{ color: 'var(--gray)', fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Create a beautiful, lasting tribute for your loved ones. Share memories, stories, and photos with family and friends in a space that lasts forever.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/signup" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                  Create Memorial
                </Link>
                {sampleMemorialId && (
                  <Link href={`/memorial/${sampleMemorialId}`} className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    View Sample Memorial
                  </Link>
                )}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <Image
                src={siteSettings?.images?.homeHeroFamily || "/images/home_hero_family.png"}
                alt="Family Sharing Memories"
                width={500}
                height={350}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  objectFit: 'cover',
                  height: '350px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Memorial Preview */}
      <div style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose Our Memorial Platform</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '3rem', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            We make it simple to create beautiful, lasting tributes that honor your loved ones.
          </p>

          {/* Feature with memorial sample image */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <Image src={siteSettings?.images?.memorialSample || "/images/memorial_sample.png"} alt="Memorial Preview" width={500} height={350} style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', height: 'auto' }} />
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--deep-purple)' }}>Beautiful Memorial Pages</h3>
              <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Each memorial is crafted with care, featuring a stunning hero section, photo galleries, life timelines, and family trees.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.5rem 0', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheck style={{ color: 'var(--deep-purple)' }} /> Elegant, responsive design
                </li>
                <li style={{ padding: '0.5rem 0', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheck style={{ color: 'var(--deep-purple)' }} /> Photo & video galleries
                </li>
                <li style={{ padding: '0.5rem 0', color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheck style={{ color: 'var(--deep-purple)' }} /> Interactive life timeline
                </li>
              </ul>
            </div>
          </div>

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

      {/* How It Works */}
      <div style={{ padding: '4rem 0', background: 'var(--light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>How It Works</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '3rem' }}>
            Create a beautiful memorial in just a few simple steps
          </p>

          {/* Process flow image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            <Image src={siteSettings?.images?.processFlow || "/images/process_flow.png"} alt="Memorial Creation Process" width={800} height={400} style={{ maxWidth: '100%', width: '800px', borderRadius: '12px', height: 'auto' }} />
          </div>

          <div className="how-it-works-grid">
            {howItWorks.map((item) => (
              <div key={item.step} className="how-it-works-step">
                <div className="step-icon">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>What Families Say</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '3rem' }}>
            Trusted by families across India to preserve precious memories
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'var(--lavender-blush)',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid var(--light-grey)'
              }}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={80}
                  height={80}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '1rem',
                    border: '3px solid white',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                />
                <p style={{ color: 'var(--gray)', fontStyle: 'italic', marginBottom: '1rem', lineHeight: 1.6 }}>
                  &quot;{t.text}&quot;
                </p>
                <h4 style={{ color: 'var(--deep-purple)', marginBottom: '0.25rem' }}>{t.name}</h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.9rem', margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Showcase */}
      <div style={{ padding: '4rem 0', background: 'var(--light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>Beautiful Memorial Galleries</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '3rem' }}>
            Showcase your loved one&apos;s life through stunning photo galleries
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
            <Image src={siteSettings?.images?.gallery?.[0] || "/images/gallery_1.png"} alt="Memory 1" width={200} height={200} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px' }} />
            <Image src={siteSettings?.images?.gallery?.[1] || "/images/gallery_2.png"} alt="Memory 2" width={200} height={200} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px' }} />
            <Image src={siteSettings?.images?.gallery?.[2] || "/images/gallery_3.png"} alt="Memory 3" width={200} height={200} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px' }} />
            <Image src={siteSettings?.images?.gallery?.[3] || "/images/gallery_4.png"} alt="Memory 4" width={200} height={200} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '2rem' }}>
                One complete package with all features included. No hidden fees, no subscriptions.
              </p>
              <Image src={siteSettings?.images?.pricingIllustration || "/images/pricing_illustration.png"} alt="Pricing" width={350} height={300} style={{ maxWidth: '100%', width: '350px', borderRadius: '12px', height: 'auto' }} />
            </div>
            <div style={{ flex: 1, minWidth: '320px' }}>
              <div className="pricing-preview-card featured">
                <div className="popular-badge">All Features Included</div>
                <h3>Complete Memorial Package</h3>
                <div className="pricing-preview-price">
                  {siteSettings?.pricing?.currency || '₹'}
                  {(siteSettings?.pricing?.amount || 1999).toLocaleString()}
                  <span>/one-time</span>
                </div>
                <ul className="pricing-preview-features">
                  {(siteSettings?.pricing?.features || [
                    'YouTube Video Embedding',
                    'Profile & Cover Pictures',
                    'Complete Guest Book',
                    'Family Tree Documentation',
                    'Life Timeline & Events',
                    'Premium Design Templates',
                    'Permanent Memorial Page'
                  ]).map((feature, idx) => (
                    <li key={idx}><FaCheck /> {feature}</li>
                  ))}
                </ul>
                <Link href="/signup" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                  Create Memorial Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '4rem 0', background: 'var(--light)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div className={`faq-question ${openFaq === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
                  <span>{faq.q}</span>
                  <FaChevronDown />
                </div>
                <div className={`faq-answer ${openFaq === index ? 'active' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, rgba(206, 147, 216, 0.95), rgba(106, 27, 154, 0.95))',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <Image src={siteSettings?.images?.heartIcon || "/images/heart_icon.png"} alt="Heart" width={60} height={60} style={{ width: '60px', marginBottom: '1rem', opacity: 0.9, borderRadius: '50%', height: 'auto' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Ready to Create a Lasting Tribute?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Honor your loved one&apos;s memory with a beautiful memorial that lasts forever.
          </p>
          <Link href="/signup" className="btn" style={{ background: 'white', color: 'var(--deep-purple)', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Create Your First Memorial
          </Link>
        </div>
      </div>
    </section>
  );
}
