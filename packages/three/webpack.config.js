"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			Three: ["./src/ts/Three.ts"]
		},
		externals: {
			"three": "three",
			"custom-element-ts": "custom-element-ts"
		},
		exportLibrary: {
			type: "module"
		}
	});
};
