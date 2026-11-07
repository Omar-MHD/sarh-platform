import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import PropertiesPage from './components/PropertiesPage/PropertiesPage';
import FinishingRequestForm from './components/FinishingRequest/FinishingRequestForm';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  // الاستماع لتغيير الـ Hash في الروابط (مثل #properties أو #tenders) للتحكم بالعرض
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentView(hash);
    };

    // تعيين القيمة عند التحميل الأول
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        {currentView === 'home' && (
          <Hero />
        )}

        {currentView === 'properties' && (
          <div style={{ padding: '40px 0' }}>
            <PropertiesPage />
          </div>
        )}

        {currentView === 'tenders' && (
          <div style={{ padding: '40px 0' }}>
            <FinishingRequestForm />
          </div>
        )}

        {currentView === 'services' && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h2>الخدمات الشاملة (قريباً...)</h2>
            <p style={{ color: 'var(--text-muted)' }}>قسم الخدمات العامة والإكساء الخارجي.</p>
          </div>
        )}

        {currentView === 'about' && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h2>من نحن - صرح (SARH)</h2>
            <p style={{ color: 'var(--text-muted)' }}>منصتك الأولى لإدارة العقارات والمناقصات الهندسية.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;