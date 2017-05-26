/**
 * Esta função irá adicionar o servidor do `webpack-dev-server` com
 * o Hot Reloading ativado ao servidor do express. Assim, não é
 * necessário manter dois servidores, facilitando a mudança de produção
 * para desenvolvimento e evitando algumas dificuldades como CORS.
 */
module.exports = function (app) {

  const webpack = require('webpack');
  const dev = require('webpack-dev-middleware');
  const hot = require('webpack-hot-middleware');
  const config = require('../webpack/config.js');

  const compiler = webpack(config);
  app.use(dev(compiler));
  app.use(hot(compiler));

  return app;
};
