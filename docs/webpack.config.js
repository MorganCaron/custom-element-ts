"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			Docs: ["./src/ts/App.ts", "./src/sass/style.sass"]
		},
		index: "./src/index.html",
		favicon: "./src/favicon.png",
		tsLoader: "babel"
	});
};
