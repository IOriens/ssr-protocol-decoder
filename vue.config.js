module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ssr-protocol-decoder/'
    : '/'
}