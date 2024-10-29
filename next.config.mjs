/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "uploadthing.com",
            'utfs.io'
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'example.com',
              pathname: '/**',
            },
        ],
    }
};

export default nextConfig;
