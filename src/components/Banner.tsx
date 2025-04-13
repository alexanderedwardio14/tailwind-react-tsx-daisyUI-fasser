import { useEffect, useState } from 'react';

interface BannerProps {
  banners: {
    image: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
  }[];
}

const Banner = ({ banners }: BannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[currentSlide];

  if (!currentBanner) return null;

  return (
    <div className="w-full relative">
      {/* Banner Images */}
      <div className="carousel w-full h-[60vh]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`carousel-item relative w-full ${
              index === currentSlide ? 'block' : 'hidden'
            }`}
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>
      
      {/* Content Section */}
      <div className="py-4 bg-base-100">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          {currentBanner.title}
        </h2>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-4">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        {/* Description section */}
        <div className="text-center max-w-2xl mx-auto px-4">
          <p className="text-lg mb-4 text-base-content/90">
            {currentBanner.description}
          </p>
          {currentBanner.buttonText && currentBanner.buttonLink && (
            <a 
              href={currentBanner.buttonLink} 
              className="btn btn-primary hover:scale-105 transition-transform duration-300"
            >
              {currentBanner.buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;