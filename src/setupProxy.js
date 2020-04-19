const { createProxyMiddleware } = require('http-proxy-middleware');
//const target_url = 'http://18.207.32.33'
module.exports = function(app) {
  app.use('/api/auth/',createProxyMiddleware({
      target: process.env.REACT_APP_HOST_URL,
      changeOrigin: true,
    }));
    app.use('/api/auth/signup',createProxyMiddleware({
        target: process.env.REACT_APP_HOST_URL,
        changeOrigin: true,
      }));
      app.use('/api/category',createProxyMiddleware({
        target: process.env.REACT_APP_HOST_URL,
        changeOrigin: true,
      }));
      app.use('/api/categories',createProxyMiddleware({
        target: process.env.REACT_APP_HOST_URL,
        changeOrigin: true,
      }));
      app.use('/api/expenses/$(id)',createProxyMiddleware({
        target: process.env.REACT_APP_HOST_URL,
        changeOrigin: true,
      }));
      app.use('/api/expenses',createProxyMiddleware({
        target: process.env.REACT_APP_HOST_URL,
        changeOrigin: true,
      }));
};