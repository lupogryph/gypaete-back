const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (options, rspack) => ({
  ...options,
  mode: 'production',
  optimization: {
    ...options.optimization,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ]
  },
  target: 'node24',
  output: {
    ...options.output,
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'gypaete-back.js'
  },
  externals: [],
  plugins: [
    ...options.plugins,
    new rspack.IgnorePlugin({
      resourceRegExp: /^(@nestjs\/(microservices\/microservices-module|websockets\/socket-module)(\.js)?|@fastify\/static)$/
    })
  ]
})