const path = require('path');

module.exports = {
	entry: {
		'javascripts/build.js': './src/index.jsx',
	},
	output: {
		filename: '[name]',
		path: path.join(__dirname, 'public'),
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_componets|public\/)/,
				loader: 'babel-loader',
			},
		],
	},
};
