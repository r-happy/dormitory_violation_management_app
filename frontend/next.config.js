module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'], // 画像のドメインを指定
  },
  env: {
    API_URL: process.env.API_URL, // 環境変数を設定
  },
};