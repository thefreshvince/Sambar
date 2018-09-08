// Required includes
const theme_name = 'sambar',
    path = require('path'),
    vue_components_path = /source\/scripts\/vue_components\/.*/,
	output_path = path.resolve(__dirname, 'js/'),
    ImageminPlugin = require('imagemin-webpack-plugin').default,
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    StylesExtractTextPlugin = new ExtractTextPlugin(`../css/${theme_name}.css`);

// Readable export for node
module.exports = {

	// What's going in
	entry: 'source/scripts/entry.js',

	// What's happening to it
	module: {

		// Determines how to handle files
		rules: [

			// Runs ES6+ transpilation
			{
				test: /\.js$/,
				exclude: [/node_modules/, vue_components_path],
				loader: "babel-loader"
			},

			// Understands scss files
			{
				test: /\.scss$/,
				exclude: [
					/source\/styles\/style\.scss$/,
					vue_components_path
				],
				loader: ['style-loader','css-loader','postcss-loader','sass-loader']
			},

			// Understands css files
			{
				test: /\.css$/,
				exclude: [vue_components_path],
				loader: ['style-loader', 'css-loader', 'postcss-loader']
			},

			// Target style css spefically for style.css
			{
				test: /source\/styles\/style\.scss$/,
				use: StylesExtractTextPlugin.extract(
					[ 'css-loader', 'postcss-loader', 'sass-loader' ]
				)
			},

			// For font files
			{
				test: /source\/fonts\/.*?\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '../fonts/[name].[ext]',
					useRelativePath: false,
					publicPath: url => url
				}
			},

            // For image files
			{
				test: /\.(jpg|png|gif|svg)$/i,
				exclude: [/images\/sprite\/.*/,vue_components_path],
				loader: 'file-loader',
				options: {
					name: '../images/[name].[ext]',
					useRelativePath: false,
					publicPath: url => url
				}
			},

			// Vue templates
			{
				test: /\.vue$/,
                include: vue_components_path,
				loader:	'vue-loader'
			},

			// JS file pulled in via vue component
            {
                test: /\.js$/,
                include: vue_components_path,
                loader: 'babel-loader'
            },

            // SCSS files pulled in via vue component
            {
                test: /\.scss$/,
                include: vue_components_path,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }

		]
	},

	// What's coming out
	output: {
		path: output_path,
		publicPath: 'js/',
		chunkFilename: '[name].bundle.js',
		filename: `${theme_name}.js`
	},

	// Plugins that will help us add functionality to webpack
	// like compiling a seperate scss file
	plugins: [
		StylesExtractTextPlugin,
		new VueLoaderPlugin(),
		new SVGSpritemapPlugin({
			prefix: '',
			src: path.resolve(__dirname, 'source/images/sprite/*.svg'),
			filename: '../images/sprite.symbol.svg',
			generateTitle: false,
			generateUse: false
		}),
		new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i })
	]

};
