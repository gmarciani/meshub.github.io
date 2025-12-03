/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	distDir: 'out',
	basePath: '/beta',
	env: {
		NEXT_PUBLIC_BASE_PATH: '/beta',
	},
	images: {
		unoptimized: true,
		domains: ["images.unsplash.com"],
	},
	trailingSlash: true,
};

export default nextConfig;
