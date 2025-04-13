import { useEffect } from 'react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': `https://your-domain.com${item.path}`,
          name: item.name
        }
      }))
    };

    let script = document.querySelector('#breadcrumb-structured-data');
    if (script) {
      script.remove();
    }
    script = document.createElement('script');
    script.id = 'breadcrumb-structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const script = document.querySelector('#breadcrumb-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [items]);

  return (
    <nav className="text-sm breadcrumbs mb-4">
      <ul>
        {items.map((item, index) => (
          <li key={item.path}>
            {item.isLast ? (
              <span className="text-primary">{item.name}</span>
            ) : (
              <Link to={item.path}>{item.name}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;