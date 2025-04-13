import { useEffect } from 'react';
import SEO from '../components/SEO';

const Home = () => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FASSER Networks',
      description: 'Professional fiber optic solutions provider since 2022',
      url: 'https://your-domain.com',
      foundingDate: '2022',
      areaServed: 'Indonesia',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '021-5020-2228',
        contactType: 'customer service',
        email: 'cs@alaskaputraperdana.com'
      },
      sameAs: [
        'https://www.linkedin.com/company/fasser-networks',
        'https://www.facebook.com/fassernetworks'
      ]
    };

    // Add structured data to head
    let script = document.querySelector('#home-structured-data');
    if (script) {
      script.remove();
    }
    const scriptElement = document.createElement('script');
    scriptElement.id = 'home-structured-data';
    scriptElement.type = 'application/ld+json';
    scriptElement.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptElement);

    return () => {
      const script = document.querySelector('#home-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <>
      <SEO 
        title="Home"
        description="FASSER Networks - Professional fiber optic solutions provider since 2022. High-quality equipment, tools, and accessories for all your fiber optic needs."
        canonicalUrl="https://your-domain.com"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">FASSER Networks</h1>
              <p className="py-6">Perusahaan kami telah berdiri sejak tahun 2022 dan bergerak di bidang Fiber Optic, Fusion Splicer, Optical Time Domain Reflectometer dan Peralatan Fiber Optic lainnya.</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Garansi Resmi</h2>
                  <p>FASSER Networks memberikan garansi resmi 2 tahun, produk berkualitas dan lengkap sesuai dengan kebutuhan anda.</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Berpengalaman</h2>
                  <p>FASSER Networks berpengalaman dalam memberikan solusi pada kebutuhan fiber optik anda.</p>
                </div>
              </div>
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Produk Lengkap</h2>
                  <p>FASSER Networks memberikan peralatan fiber optik paling lengkap di Indonesia.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;