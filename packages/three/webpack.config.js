"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			Demo: ["./src/demo/style.sass", "./src/demo/App.ts"]
		},
		index: "src/demo/index.html"
	});
};
