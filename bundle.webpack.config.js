const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// Documentation:
// https://docs.nestjs.com/faq/serverless#serverless
// https://github.com/nestjs/swagger/issues/1334#issuecomment-836488125

// Tell webpack to ignore specific imports that aren't
// used by our Lambda but imported by NestJS (can cause packing errors).
const lazyImports = [
  'node-fetch',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets/socket-module',
  'class-transformer/storage' // https://github.com/nestjs/mapped-types/issues/486#issuecomment-932715880
]

module.exports = (options, webpack) => ({
  ...options,
  mode: 'production',
  //devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
        },
      }),
    ]
  },
    target: 'node22',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
      filename: 'gypaete-back.js'
  },
    externals: []
})