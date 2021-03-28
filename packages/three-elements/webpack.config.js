"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			Three: ["./src/ts/Three.ts"]
		},
		index: "src/docs/index.html",
		favicon: "./src/docs/favicon.png"
	});
};
