// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://frontvalencia.com',
  base: '/',

  output: 'static',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es', en: 'en' },
      },
      filter: (page) => !page.includes('/admin') && !page.includes('/api/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: { react: ['react', 'react-dom'] },
        },
      },
    },
  },

  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'css-variables', wrap: true },
  },

  image: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'http', hostname: 'localhost', port: '3001' },
      { protocol: 'https', hostname: 'media.frontvalencia.com' },
    ],
  },

  trailingSlash: 'always',
})
