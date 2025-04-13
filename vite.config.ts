import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { generateSitemap } from './src/utils/generateSitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sitemap',
      configureServer(server) {
        server.middlewares.use('/sitemap.xml', async (req, res) => {
          try {
            const sitemap = await generateSitemap('https://your-domain.com') // Replace with your actual domain
            res.setHeader('Content-Type', 'application/xml')
            res.end(sitemap)
          } catch (error) {
            console.error('Error serving sitemap:', error)
            res.statusCode = 500
            res.end('Internal Server Error')
          }
        })
      },
      async generateBundle() {
        try {
          const sitemap = await generateSitemap('https://your-domain.com') // Replace with your actual domain
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: sitemap
          })
        } catch (error) {
          console.error('Error generating sitemap during build:', error)
        }
      }
    }
  ],
})
