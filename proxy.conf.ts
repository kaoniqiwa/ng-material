const PROXY_CONFIG = [
  {
    context: [
      '/howell/ver10/data_service/',
      '/api/howell/ver10/aiop_service/',
      '/api/howell/ver10/garbage_profiles/',
      '/video/wsplayer/',
    ],
    target: 'http://wechat.51hws.cn:8080',
    changeOrigin: true,
    secure: false,
  },
];
module.exports = PROXY_CONFIG;
