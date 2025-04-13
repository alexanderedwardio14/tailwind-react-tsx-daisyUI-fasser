const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Fusion Splicer Installation',
      category: 'Equipment',
      imageUrl: '/images/placeholder-1.jpg', // Placeholder - you'll need to add actual images
      description: 'Professional installation of fusion splicer equipment'
    },
    {
      id: 2,
      title: 'Fiber Optic Testing',
      category: 'Testing',
      imageUrl: '/images/placeholder-2.jpg',
      description: 'Quality testing of fiber optic connections'
    },
    {
      id: 3,
      title: 'Network Installation',
      category: 'Installation',
      imageUrl: '/images/placeholder-3.jpg',
      description: 'Complete fiber optic network installation'
    },
    {
      id: 4,
      title: 'Equipment Showcase',
      category: 'Products',
      imageUrl: '/images/placeholder-4.jpg',
      description: 'Our range of professional fiber optic equipment'
    },
    {
      id: 5,
      title: 'Training Session',
      category: 'Training',
      imageUrl: '/images/placeholder-5.jpg',
      description: 'Professional training and certification programs'
    },
    {
      id: 6,
      title: 'Product Display',
      category: 'Products',
      imageUrl: '/images/placeholder-6.jpg',
      description: 'Latest fiber optic products and accessories'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <div className="w-full h-48 bg-base-300 rounded-xl flex items-center justify-center">
                  {/* Replace with actual images */}
                  <span className="text-base-content opacity-50">Image placeholder</span>
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.title}
                  <div className="badge badge-secondary">{item.category}</div>
                </h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image placeholder note */}
        <div className="alert alert-info mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Note: The gallery currently shows placeholder images. Replace them with actual project photos and equipment images.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Gallery;