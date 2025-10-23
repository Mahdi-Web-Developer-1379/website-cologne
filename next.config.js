// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//     // serverComponentsExternalPackages: ["mongoose"],
//   },
  
// }

// module.exports = nextConfig




/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        net: false,
        tls: false,
        dns: false,
      };
    }

    return config;
  },
  
  experimental: {
    appDir: true,
    
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;