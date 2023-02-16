const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const svgToMiniDataURI = require("mini-svg-data-uri")
const path = require("path")

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: "./index.js",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "assets/[name][ext]",
		clean: true,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html"),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "public/favicon.png"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
		new MiniCssExtractPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(jpe?g|png|webp|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.svg/,
				type: "asset/inline",
				generator: {
					dataUrl: (content) => {
						content = content.toString()
						return svgToMiniDataURI(content)
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			{
				test: /\.mp3$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/sounds/[name][ext]",
				},
			},
		],
	},
}
