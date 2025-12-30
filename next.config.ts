/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	distDir: 'out',
	basePath: '',
	env: {
		NEXT_PUBLIC_BASE_PATH: '',
	},
	images: {
		unoptimized: true,
		domains: ["images.unsplash.com"],
	},
	trailingSlash: true,
};

export default nextConfig;
