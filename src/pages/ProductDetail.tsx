import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductSidebar from '../components/ProductSidebar'
import { slugify } from '../utils/slugify'

interface ProductSpec {
  id: number
  product_id: string
  spec_name: string
  spec_value: string
}

interface Product {
  ID: string
  Name: string
  Description: string
  Category: string
  Image: string
  Type: string
  Jenis: string
  Anak: string
  Price: number
  slug?: string
}

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [specs, setSpecs] = useState<ProductSpec[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data: products, error: productsError } = await supabase
          .from('products')
          .select('*')

        if (productsError) throw productsError

        const product = products?.find(p => slugify(p.Name) === slug)
        
        if (!product) {
          navigate('/products')
          return
        }

        setProduct(product)
          
        const { data: specsData, error: specsError } = await supabase
          .from('product_specs')
          .select('id, product_id, spec_name, spec_value')
          .eq('product_id', product.ID)

        if (specsError) throw specsError
        setSpecs(specsData || [])

        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('Category', product.Category)
          .neq('ID', product.ID)
          .limit(3)

        if (relatedError) throw relatedError
        setRelatedProducts(relatedData || [])
      } catch (error) {
        console.error('Error fetching product details:', error)
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProductDetails()
    }
  }, [slug, navigate])

  useEffect(() => {
    if (product) {
      const structuredData = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.Name,
        description: product.Description,
        image: product.Image,
        category: product.Category,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock'
        }
      };

      const existingScript = document.querySelector('#product-structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const newScript = document.createElement('script') as HTMLScriptElement;
      newScript.id = 'product-structured-data';
      newScript.type = 'application/ld+json';
      newScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(newScript);

      return () => {
        const script = document.querySelector('#product-structured-data');
        if (script) {
          script.remove();
        }
      };
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Product not found</span>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.Category, path: `/products/${encodeURIComponent(product.Category)}` },
    { name: product.Name, path: `/product/${slug}`, isLast: true }
  ]

  return (
    <>
      <SEO 
        title={product.Name}
        description={product.Description}
        image={product.Image}
        type="product"
        canonicalUrl={`https://your-domain.com/product/${slug}`}
      />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <ProductSidebar />
            </div>

            <div className="lg:w-3/4">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <img
                        src={product.Image || '/images/placeholder.jpg'}
                        alt={product.Name}
                        className="rounded-xl w-full object-cover"
                      />
                    </div>

                    <div>
                      <h1 className="text-3xl font-bold mb-4">{product.Name}</h1>
                      
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <span className="badge badge-primary">{product.Category}</span>
                          <span className="badge badge-secondary">{product.Jenis}</span>
                          {product.Anak && <span className="badge">{product.Anak}</span>}
                        </div>

                        <p className="text-lg">{product.Description}</p>

                        {product.Price && (
                          <div className="text-2xl font-bold text-primary">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR'
                            }).format(product.Price)}
                          </div>
                        )}

                        <div className="card-actions justify-start">
                          <Link 
                            to={`https://wa.me/6281322622658?text=${encodeURIComponent(
                              `Halo, saya tertarik dengan produk ${product.Name}. Mohon informasi lebih lanjut.`
                            )}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                            </svg>
                            Hubungi via WhatsApp
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {specs.length > 0 && (
                <div className="card bg-base-100 shadow-xl mt-8">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>Specification</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specs.map((spec) => (
                            <tr key={spec.id}>
                              <td className="font-medium">{spec.spec_name}</td>
                              <td>{spec.spec_value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {relatedProducts.length > 0 && (
                <div className="card bg-base-100 shadow-xl mt-8">
                  <div className="card-body">
                    <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedProducts.map((related) => (
                        <div key={related.ID} className="card bg-base-200">
                          <figure className="px-4 pt-4">
                            <img
                              src={related.Image || '/images/placeholder.jpg'}
                              alt={related.Name}
                              className="rounded-xl h-48 w-full object-cover"
                            />
                          </figure>
                          <div className="card-body">
                            <h3 className="card-title">{related.Name}</h3>
                            <p className="text-sm opacity-70">{related.Type}</p>
                            <div className="card-actions justify-end mt-4">
                              <Link 
                                to={`/product/${slugify(related.Name)}`} 
                                className="btn btn-primary btn-sm"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail