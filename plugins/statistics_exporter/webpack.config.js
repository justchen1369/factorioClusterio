"use strict";
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const common = require("@clusterio/web_ui/webpack.common");

module.exports = (env = {}) => merge(common(env), {
	context: __dirname,
	entry: "./web/index.jsx",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "static"),
	},
	plugins: [
		new webpack.container.ModuleFederationPlugin({
			name: "statistics_exporter",
			library: { type: "var", name: "plugin_statistics_exporter" },
			filename: "remoteEntry.js",
			exposes: {
				"./info": "./info.js",
			},
			shared: {
				"@clusterio/lib": { import: false },
				"@clusterio/web_ui": { import: false },
				"ajv": { import: false },
			},
		}),
	],
});
