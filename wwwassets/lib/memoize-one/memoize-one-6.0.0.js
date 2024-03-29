(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.memoizeOne = factory());
})(this, (function () { 'use strict';

	var safeIsNaN = Number.isNaN ||
		function ponyfill(value) {
			return typeof value === 'number' && value !== value;
		};
	function isEqual(first, second) {
		if (first === second) {
			return true;
		}
		if (safeIsNaN(first) && safeIsNaN(second)) {
			return true;
		}
		return false;
	}
	function areInputsEqual(newInputs, lastInputs) {
		if (newInputs.length !== lastInputs.length) {
			return false;
		}
		for (var i = 0; i < newInputs.length; i++) {
			if (!isEqual(newInputs[i], lastInputs[i])) {
				return false;
			}
		}
		return true;
	}

	function memoizeOne(resultFn, isEqual) {
		if (isEqual === void 0) { isEqual = areInputsEqual; }
		var cache = null;
		function memoized() {
			var newArgs = [];
			for (var _i = 0; _i < arguments.length; _i++) {
				newArgs[_i] = arguments[_i];
			}
			if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
				return cache.lastResult;
			}
			var lastResult = resultFn.apply(this, newArgs);
			cache = {
				lastResult: lastResult,
				lastArgs: newArgs,
				lastThis: this,
			};
			return lastResult;
		}
		memoized.clear = function clear() {
			cache = null;
		};
		return memoized;
	}

	return {default: memoizeOne};

}));
