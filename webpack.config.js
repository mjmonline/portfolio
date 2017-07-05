const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./app/scripts/main.js', "./app/scss/styles.scss" ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              query: {
                sourceMap: false,
              },
            },
          ],
        })
			}
		]
	},
	plugins: [
		new extractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),
	]
};