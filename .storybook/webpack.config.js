const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const globals = {
  __DEV__: true
}

module.exports = {
  plugins: [
    new webpack.DefinePlugin(globals),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'awesome-typescript-loader?module=es6',
        exclude: [/node_modules/]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(s?)css$/,
        exclude: /\.cssmodule\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "mediaTypes.scss";',
              includePaths: [path.resolve(__dirname, '../globals')]
            }
          }
        ]
      },
      {
        test: /(\.cssmodule|\.cssmodule\.scss)$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              data: '@import "mediaTypes.scss";',
              includePaths: [path.resolve(__dirname, '../globals')]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
}
