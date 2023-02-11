const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.png'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons/sun.svg'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons/cloud-rain.svg'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons/cloud-snow.svg'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/icons/pause.svg'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/sounds/rain.mp3'),
          to: path.resolve(__dirname, 'dist/sounds'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/sounds/summer.mp3'),
          to: path.resolve(__dirname, 'dist/sounds'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/sounds/winter.mp3'),
          to: path.resolve(__dirname, 'dist/sounds'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/rain-bg.jpg'),
          to: path.resolve(__dirname, 'dist/image'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/summer-bg.jpg'),
          to: path.resolve(__dirname, 'dist/image'),
        },
        {
          from: path.resolve(__dirname, 'src/assets/winter-bg.jpg'),
          to: path.resolve(__dirname, 'dist/image'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            content = content.toString()
            return svgToMiniDataURI(content)
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
      },
    ],
  },
}
