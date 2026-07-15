const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyTarget = process.env.REACT_APP_PROXY_TARGET || 'http://tap.jitihada.co.tz';

module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: proxyTarget,
      changeOrigin: true,
    })
  );
};
