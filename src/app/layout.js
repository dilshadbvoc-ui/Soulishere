import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import connectDB from '@/lib/mongodb';
import SiteSettings from '@/models/SiteSettings';

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne();

    if (settings && settings.seo) {
      return {
        title: settings.seo.title,
        description: settings.seo.description,
        keywords: settings.seo.keywords,
      };
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }

  return {
    title: 'Soulishere - Digital Memorial Platform',
    description: 'Create beautiful, lasting digital memorials for your loved ones. Preserve memories, celebrate lives, and share tributes with family and friends.',
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <div className="app">
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

