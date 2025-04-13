import { useEffect } from 'react'
import SEO from '../components/SEO'

const About = () => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      mainEntity: {
        '@type': 'Organization',
        name: 'FASSER Networks',
        description: 'Professional fiber optic solutions provider since 2022',
        foundingDate: '2022',
        areaServed: 'Indonesia',
        knowsAbout: [
          'Fiber Optics',
          'Fusion Splicer',
          'Optical Time Domain Reflectometer',
          'Network Equipment'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Fiber Optic Products',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Patch Cord',
              description: 'High-quality fiber optic patch cords'
            },
            {
              '@type': 'OfferCatalog',
              name: 'Fiber Optic Tools',
              description: 'Professional installation and maintenance tools'
            },
            {
              '@type': 'OfferCatalog',
              name: 'Network Equipment',
              description: 'Advanced networking equipment'
            }
          ]
        }
      }
    };

    // Add structured data to head
    let script = document.querySelector('#about-structured-data');
    if (script) {
      script.remove();
    }
    script = document.createElement('script');
    script.id = 'about-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector('#about-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about FASSER Networks, Indonesia's trusted provider of fiber optic solutions since 2022. Discover our commitment to quality and excellence in fiber optic equipment and services."
        canonicalUrl="https://your-domain.com/about"
        type="website"
      />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">About FASSER Networks</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Our Company</h2>
                <p className="mb-4">
                  FASSER Networks telah berdiri sejak tahun 2022 dan bergerak di bidang Fiber Optic. 
                  Kami menyediakan berbagai peralatan fiber optik berkualitas tinggi dengan garansi resmi.
                </p>
                <p className="mb-4">
                  Sebagai distributor terpercaya, kami berkomitmen untuk memberikan solusi terbaik 
                  untuk kebutuhan fiber optik pelanggan kami.
                </p>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Our Vision</h2>
                <p className="mb-4">
                  Menjadi distributor peralatan fiber optik terpercaya dan terdepan di Indonesia.
                </p>
                <h2 className="card-title mb-4 mt-6">Our Mission</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Menyediakan produk berkualitas dengan garansi resmi</li>
                  <li>Memberikan pelayanan terbaik kepada pelanggan</li>
                  <li>Menjadi mitra terpercaya dalam solusi fiber optik</li>
                  <li>Mengikuti perkembangan teknologi fiber optik terkini</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl mt-8">
            <div className="card-body">
              <h2 className="card-title mb-4">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Garansi Resmi</h3>
                  <p>Produk kami dilengkapi dengan garansi resmi selama 2 tahun</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Produk Berkualitas</h3>
                  <p>Kami hanya menyediakan peralatan fiber optik berkualitas tinggi</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Layanan Terbaik</h3>
                  <p>Tim support kami siap membantu Anda dengan solusi terbaik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;