/** @type {import('next').NextConfig} */
const nextConfig = {
    
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      },
      {
        protocol: "https",
        hostname: "cdn.w600.comps.canstockphoto.com"
      },
      
    ],
  },
}

module.exports = nextConfig
