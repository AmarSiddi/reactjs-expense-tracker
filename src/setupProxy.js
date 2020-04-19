const { createProxyMiddleware } = require('http-proxy-middleware');
const target_url = 'http://18.207.32.33'
module.exports = function(app) {
  app.use('/api/auth/signin',createProxyMiddleware({
      target: target_url,
      changeOrigin: true,
    }));
    app.use('/api/auth/signup',createProxyMiddleware({
        target: target_url,
        changeOrigin: true,
      }));
      app.use('/api/category',createProxyMiddleware({
        target: target_url,
        changeOrigin: true,
      }));
      app.use('/api/categories',createProxyMiddleware({
        target: target_url,
        changeOrigin: true,
      }));
      app.use('/api/expenses/$(id)',createProxyMiddleware({
        target: target_url,
        changeOrigin: true,
      }));
      app.use('/api/expenses',createProxyMiddleware({
        target: target_url,
        changeOrigin: true,
      }));
};