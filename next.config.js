/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }
//
// module.exports = nextConfig
const withCss = require('@zeit/next-css')
if (typeof require !== 'undefined'){
  require.extensions['.css'] = file => {}
}
module.exports = withCss({})
