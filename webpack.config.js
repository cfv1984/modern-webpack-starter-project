/*eslint-disable*/ // ESLint gtfo of my config
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IS_DEV =
	process.env.NODE_ENV !== "production" ||
	[...process.argv].some(p => p.includes("mode=development"));
const extensions = [".tsx", ".ts", ".js", "css", "scss"];
const resolve = { extensions };
const devServer = {
	contentBase: __dirname + "/dist",
	watchContentBase: true
};

const output = {
	filename: "[name].js",
	path: __dirname + "/dist"
};

const plugins = [];

if (IS_DEV) {
	plugins.push(
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	);
}

const rules = [
	{
		test: /\.tsx?$/,
		use: "ts-loader",
		exclude: /node_modules/
	},
	{
		test: /\.m?js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: "babel-loader",
			options: {
				presets: [
					[
						require.resolve("@babel/preset-env"),
						{
							useBuiltIns: "entry",
							targets: {
								chrome: "58",
								ie: "9"
							}
						}
					]
				],
				plugins: []
			}
		}
	},
	{
		test: /\.(css|sass|scss)$/,
		use: [
			MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					importLoaders: 2,
					localIdentName: "[name]-[hash:base26:5]"
				}
			},
			{
				loader: "sass-loader",
				options: {
					sourceMap: true,
					outputStyle: "compressed"
				}
			}
		]
	}
];

module.exports = () => {
	return {
		entry: { bundle: __dirname + "/src/js/index.js" },
		module: { rules: rules },
		devServer,
		resolve,
		output,
		plugins,
		optimization: {
			minimize: !IS_DEV
		},
		devtool: "inline-source-map"
	};
};

/* eslint-enable */
