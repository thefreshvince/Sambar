// Required includes
const theme_name = 'sambar',

    // WP `/app/themes/${theme_name}`,
    // Statamic `/site/themes/${theme_name}`,
    theme_dir_public = `/app/themes/${theme_name}`,
    theme_dir = `public${theme_dir_public}`,

    webpack = require("webpack"),
    vue_components_path = /source\/scripts\/components\/.*/,
    path = require('path'),
	output_path = path.resolve(__dirname, `${theme_dir}/assets/js/`),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin'),
	ImageminPlugin = require('imagemin-webpack-plugin').default,
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin');

// Readable export for node
module.exports = env => {
	let config = {

		// Set the build mode
		mode: env && env.production ? 'production' : 'development',

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
                        /source\/styles\/main\.scss$/,
                        /source\/styles\/critical\.scss$/,
						/source\/styles\/splash\.scss$/,
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
					test: [
                        /source\/styles\/main\.scss$/,
                        /source\/styles\/critical\.scss$/
                    ],
					use: [
						{
                            loader: 'file-loader',
                            options: {
                                name: '[name].css',
                                context: './',
                                outputPath: `../css/`,
                                publicPath: '../css/'
                            }
                        },
                        {loader: 'extract-loader'},
						{loader: 'css-loader' },
						{loader: 'postcss-loader' },
						{loader: 'sass-loader' },
					]
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
						publicPath: url => `${theme_dir}/images/${url}`
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

		// Set up aliases
		resolve: {
			alias: {
				vue: env && env.production ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
				'@': path.resolve(__dirname, 'source')
			}
		},

		// Plugins that will help us add functionality to webpack
		// like compiling a seperate scss file
		plugins: [
			new CleanWebpackPlugin([`${theme_dir}/assets/js`],{
				exclude:  ['.gitkeep','splash.js'],
			}),
			new webpack.HashedModuleIdsPlugin(),
			new VueLoaderPlugin(),
			new SVGSpritemapPlugin({
				prefix: '',
				src: path.resolve(__dirname, 'source/images/sprite/*.svg'),
				filename: '../images/sprite.symbol.svg',
				generateTitle: false,
				generateUse: false
			}),
			new ImageminPlugin({ test: /\.(jpe?g|png|gif)$/i })
		],

		// Set up optimizations
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						mangle: true,
						output: { comments: false }
					}
				}),
			],
			minimize: env && env.production
		}

	};

	// The main output
	let mainConfig = Object.assign({}, config,{
		name: theme_name,
		entry: path.resolve(__dirname, 'source/scripts/entry.js'),
		output: {
			path: output_path,
			publicPath: `${theme_dir_public}/assets/js/`,
			chunkFilename: '[name].bundle.js?[contenthash]',
			filename: `main.js`
		},
	});

	// add chunk splitting
	mainConfig.optimization.splitChunks = { 
		chunks: 'all'
	};

	// The main output
	let WebworkerLoadingConfig = Object.assign({}, config,{
		name: theme_name,
		entry: path.resolve(__dirname, 'source/scripts/webworker-loading.js'),
		output: {
			path: output_path,
			publicPath: `${theme_dir_public}/assets/js/`,
			chunkFilename: '[name].bundle.js',
			filename: `webworker-loading.js`
		}
	});

	// Return Array of Configurations
	return [ 
		mainConfig, 
		WebworkerLoadingConfig 
	];

}