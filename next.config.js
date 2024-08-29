/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL: 'https://finance.uiexpertz.com/', // Replace with your actual API URL
    },
    images: {
        domains: ['finance.uiexpertz.com', '1.gravatar.com'],
    },
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'finance.local',
            pathname: '/wp-content/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'finance.uiexpertz.com',
            pathname: '/wp-content/uploads/**',
          },
          {
            protocol: 'https',
            hostname: 'secure.gravatar.com',
          
          },
          {
            protocol: 'https',
            hostname: 'secure.gravatar.com',
           
          },
        ],
      },
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
      },
}
 
module.exports = nextConfig
