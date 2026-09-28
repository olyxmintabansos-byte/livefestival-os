import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/livefestival-os',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
