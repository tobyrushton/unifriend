/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental:{
    appDir: true,
    forceSwcTransforms: true,
  },
  optimizeFonts: false,
  images: {
    remotePatterns: [{
      protocol:'https',
      hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.split('//')[1]
    }],
    minimumCacheTTL: 0
  },
}

module.exports = nextConfig