/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    images: {
        domains: [], // Add external domains if needed
        formats: ['image/avif', 'image/webp'],
    },
};

module.exports = nextConfig;
