/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: [
      's2.glbimg.com',
      'finger.ind.br',
      'classic.exame.com',
      'consultoriodehipnose.com.br',
      'img.freepik.com'
    ],
    unoptimized: true,
  },
  basePath: '/evolucao-vistoria',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 