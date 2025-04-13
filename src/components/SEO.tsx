interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  canonicalUrl?: string;
}

export const SEO = ({ title, description, image, type = 'website', canonicalUrl }: SEOProps) => {
  // Update the document title
  document.title = `${title} | FASSER Networks`;
  
  // Update meta tags
  const metaTags = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];

  if (image) {
    metaTags.push(
      { property: 'og:image', content: image },
      { name: 'twitter:image', content: image }
    );
  }

  // Update existing or create new meta tags
  metaTags.forEach(({ name, property, content }) => {
    // Remove existing tags
    const existingTag = document.querySelector(`meta[${name ? `name="${name}"` : `property="${property}"`}]`);
    if (existingTag) {
      existingTag.remove();
    }

    // Create new tag
    const meta = document.createElement('meta');
    if (name) meta.setAttribute('name', name);
    if (property) meta.setAttribute('property', property);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  });

  // Handle canonical URL
  if (canonicalUrl) {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = canonicalUrl;
    document.head.appendChild(canonical);
  }

  return null;
};

export default SEO;