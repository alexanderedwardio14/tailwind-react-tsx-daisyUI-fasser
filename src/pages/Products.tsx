import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import { slugify } from '../utils/slugify'
import ProductSidebar from '../components/ProductSidebar';

interface Product {
  ID: string
  Name: string
  Description: string
  Category: string
  Image: string
  Type: string
  slug?: string
}

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = supabase
          .from('products')
          .select('ID, Name, Description, Category, Image, Type')

        if (category) {
          query = query.eq('Category', decodeURIComponent(category))
        }

        const { data, error } = await query

        if (error) {
          console.error('Supabase error:', error)
          setError(error.message)
          throw error
        }

        console.log('Connection successful')
        console.log('Fetched products:', data)

        if (!data || data.length === 0) {
          console.log('No products found in the database')
          setProducts([])
          return
        }

        const validProducts = data.filter(product => product.ID).map(product => ({
          ...product,
          slug: slugify(product.Name)
        }))
        setProducts(validProducts)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'An error occurred while fetching products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  useEffect(() => {
    if (products.length > 0) {
      const structuredData = {
        '@context': 'https://schema.org/',
        '@type': 'ItemList',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.Name,
            description: product.Description,
            category: product.Category
          }
        }))
      };

      const existingScript = document.querySelector('#products-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const newScript = document.createElement('script') as HTMLScriptElement;
      newScript.id = 'products-structured-data';
      newScript.type = 'application/ld+json';
      newScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(newScript);

      return () => {
        const script = document.querySelector('#products-structured-data');
        if (script) {
          script.remove();
        }
      };
    }
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    )
  }

  const productsByCategory = products.reduce((acc: { [key: string]: Product[] }, product) => {
    const category = product.Category || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  }, {})

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(category ? [{ name: category, path: `/products/${encodeURIComponent(category)}`, isLast: true }] : [])
  ]

  return (
    <>
      <SEO 
        title={category ? `${category} Products` : "Our Products"}
        description={category 
          ? `Browse our selection of ${category.toLowerCase()} products. High-quality fiber optic solutions from FASSER Networks.`
          : "Explore our complete range of fiber optic products. Find high-quality solutions for your networking needs."
        }
      />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

          <h1 className="text-4xl font-bold text-center mb-8">
            {category ? `${category} Products` : "Our Products"}
          </h1>
        
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <ProductSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 gap-8">
                {Object.entries(productsByCategory).map(([categoryName, categoryProducts]) => (
                  <div key={`category-${categoryName}`} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title text-2xl mb-4">
                        <Link 
                          to={`/products/${encodeURIComponent(categoryName)}`}
                          className="hover:text-primary"
                        >
                          {categoryName}
                        </Link>
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categoryProducts.map((product) => (
                          <div 
                            key={product.ID} 
                            className="card bg-base-200"
                          >
                            <figure className="px-4 pt-4">
                              <img
                                src={product.Image || '/images/placeholder.jpg'}
                                alt={product.Name}
                                className="rounded-xl h-48 w-full object-cover"
                              />
                            </figure>
                            <div className="card-body">
                              <h3 className="card-title text-lg">{product.Name}</h3>
                              <p className="text-sm opacity-70">{product.Type || 'No type specified'}</p>
                              <div className="card-actions justify-end mt-4">
                                <Link 
                                  to={`/product/${product.slug}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center mt-8">
                  <p className="text-lg">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products