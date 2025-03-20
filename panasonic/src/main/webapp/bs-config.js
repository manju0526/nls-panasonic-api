const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  port: 3000,
  server: {
    baseDir: './',
    middleware: [
      createProxyMiddleware('/api', {
        target: 'http://localhost:8888',
        changeOrigin: true,
        logLevel: 'debug'
      })
    ]
  },
  files: ['./**/*.{html,htm,css,js,ts}']
};
