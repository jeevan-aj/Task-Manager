/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

// next.config.js
export const reactStrictMode = true;
export function webpack(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@mui/styled-engine': '@mui/styled-engine-sc',
  };
  return config;
}
