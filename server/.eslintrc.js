module.exports = {
	"env": {
		"commonjs": true,
		"es2021": true,
		"node": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12
	},
	"rules": {
		"indent": [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"quotes": [ "error", "double" ],
		"semi": [ "error", "always" ],
		"no-eval": [ "error" ],
		"func-names": ["error", "always"],
		"no-var": "error",
		"no-constant-condition": "error",
		"no-await-in-loop": "error",
		"eqeqeq": ["error", "always"],
	}
};
