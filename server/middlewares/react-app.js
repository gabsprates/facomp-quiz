const { NODE_ENV } = process.env;

/*
 * Este middleware irá servir a aplicação REACT:
 *
 * - Via Webpack Dev Server se NODE_ENV for development
 * - Através da pasta `dist` caso contrário
 *
 * O módulo exporta uma função que deve receber o servidor, diferente do
 * padrão de ser utilizada para `app.use`, para evitar que seja
 * necessário ter instalado as depedências de desenvolvimento em certos
 * ambientes.
 */

module.exports = (app) => {

  if (NODE_ENV === 'development') {

    const webpack = require('webpack');
    const dev = require('webpack-dev-middleware');
    const hot = require('webpack-hot-middleware');
    const config = require('../../webpack/config.js');

    const compiler = webpack(config);
    app.use(dev(compiler));
    app.use(hot(compiler));

  } else {

    const path = require('path');
    const static = require('serve-static');
    app.use(static(path.join(__dirname, '../../dist')));

  }


  return app;
};
