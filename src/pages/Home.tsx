import { useEffect } from 'react';
import SEO from '../components/SEO';
import Banner from '../components/Banner';

// Import banner images
import bannerPatchCord from '../assets/banner/BANNERFIBEROPTICPATCHCORD.png';
import bannerTool from '../assets/banner/BANNERFIBEROPTICTOOL.png';
import bannerAccessory from '../assets/banner/BannerFIBEROPTICACCESSORY.png';
import bannerSplicer from '../assets/banner/BANNERFUSIONSPLICER.png';
import bannerOTDR from '../assets/banner/BANNEROTDR.png';
import banner1 from '../assets/banner/1.png';

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

  const banners = [
    {
      image: bannerPatchCord,
      title: "Fiber Optic Patch Cord",
      description: "High-quality fiber optic patch cords for reliable network connections",
      buttonText: "View Products",
      buttonLink: "/products"
    },
    {
      image: bannerTool,
      title: "Fiber Optic Tools",
      description: "Professional tools for fiber optic installation and maintenance",
      buttonText: "Explore Tools",
      buttonLink: "/products"
    },
    {
      image: bannerAccessory,
      title: "Fiber Optic Accessories",
      description: "Complete range of accessories for your fiber optic needs",
      buttonText: "View Accessories",
      buttonLink: "/products"
    },
    {
      image: bannerSplicer,
      title: "Fusion Splicer",
      description: "High-precision fusion splicers for perfect fiber optic connections",
      buttonText: "Learn More",
      buttonLink: "/products"
    },
    {
      image: bannerOTDR,
      title: "OTDR Equipment",
      description: "Advanced Optical Time Domain Reflectometer for precise measurements",
      buttonText: "Discover More",
      buttonLink: "/products"
    },
    {
      image: banner1,
      title: "FASSER Networks",
      description: "Your trusted partner for all fiber optic solutions",
      buttonText: "Contact Us",
      buttonLink: "/contact"
    }
  ];

  return (
    <>
      <SEO 
        title="Home"
        description="FASSER Networks - Professional fiber optic solutions provider since 2022. High-quality equipment, tools, and accessories for all your fiber optic needs."
        canonicalUrl="https://your-domain.com"
      />
      <div className="min-h-screen">
        {/* Banner Section */}
        <Banner banners={banners} />

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