import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import { supabase } from '../lib/supabase'

interface Product {
  ID: string;
  Category: string;
}

export async function generateSitemap(hostname: string) {
  try {
    // Fetch all products to include in sitemap
    const { data: products } = await supabase
      .from('products')
      .select('ID, Category')

    // Create sitemap stream
    const stream = new SitemapStream({ hostname })
    
    // Add static pages
    stream.write({ url: '/', changefreq: 'daily', priority: 1.0 })
    stream.write({ url: '/about', changefreq: 'monthly', priority: 0.8 })
    stream.write({ url: '/products', changefreq: 'daily', priority: 0.9 })
    stream.write({ url: '/gallery', changefreq: 'weekly', priority: 0.7 })
    stream.write({ url: '/contact', changefreq: 'monthly', priority: 0.8 })

    // Add dynamic product pages
    if (products) {
      products.forEach((product: Product) => {
        stream.write({
          url: `/product/${product.ID}`,
          changefreq: 'weekly',
          priority: 0.8
        })
      })

      // Add category pages
      const categories = [...new Set(products.map(p => p.Category))]
      categories.forEach(category => {
        stream.write({
          url: `/products?category=${encodeURIComponent(category)}`,
          changefreq: 'weekly',
          priority: 0.7
        })
      })
    }

    // End the stream
    stream.end()

    // Generate sitemap XML
    const sitemap = await streamToPromise(Readable.from(stream)).then(data => data.toString())
    return sitemap
  } catch (error) {
    console.error('Error generating sitemap:', error)
    throw error
  }
}