const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/user_system',
      '/api/howell/ver10/aiop_service/',
      '/api/howell/ver10/garbage_profiles/',
      '/video/wsplayer/',
    ],
    target: 'http://wechat.51hws.cn:8080',
    changeOrigin: true,
    secure: false,
  },
  {
    context: ['/api'],
    target: 'http://localhost:8888/FrontEnd/Angular/Angular-io/Http/server/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  },
];
module.exports = PROXY_CONFIG;
