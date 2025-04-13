interface OpenGraphImageProps {
  title: string;
  description?: string;
  imageUrl?: string;
}

const OpenGraphImage = ({ title, description, imageUrl }: OpenGraphImageProps) => {
  const defaultImage = '/images/og-default.jpg'; // Default OG image
  const imageToUse = imageUrl || defaultImage;

  const metaTags = [
    { property: 'og:image', content: imageToUse },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:image', content: imageToUse },
    { name: 'twitter:card', content: 'summary_large_image' }
  ];

  // Update meta tags
  metaTags.forEach(({ name, property, content }) => {
    const selector = name 
      ? `meta[name="${name}"]` 
      : `meta[property="${property}"]`;
    
    let tag = document.querySelector(selector);
    
    if (tag) {
      tag.setAttribute('content', content);
    } else {
      tag = document.createElement('meta');
      if (name) tag.setAttribute('name', name);
      if (property) tag.setAttribute('property', property);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    }
  });

  return null;
}

export default OpenGraphImage;