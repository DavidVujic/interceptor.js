/* exported interceptor */
var interceptor = (function () {
	'use strict';

	var toArray = function (args) {
		if (args.length === 1) {
			return [args[0]];
		}

		return Array.prototype.slice.call(args, 0);
	};

	var intercept = function (source, before, after) {
		return function () {
			var args = toArray(arguments);

			if (before) {
				before(args);
			}

			var result = source.apply(null, args);

			if (after) {
				after(result);
			}

			return result;
		};
	};

	var copyProperties = function (source, target) {
		var staticProperty;

		for (staticProperty in source) {
			if (!source.hasOwnProperty(staticProperty)) {
				continue;
			}

			target[staticProperty] = source[staticProperty];
		}

		return target;
	};

	var isArray = function (obj) {
		var toStr = Object.prototype.toString;
		var expected = toStr.call([]);

		return toStr.call(obj) === expected;
	};

	var create = function (obj, target, before, after) {
		var modifiedObj = obj;
		var i;
		var func;
		var modifiedFunc;

		if (!isArray(target)) {
			target = [target];
		}

		for (i = 0; i < target.length; i += 1) {
			func = modifiedObj[target[i]];
			modifiedFunc = intercept(func, before, after);

			modifiedObj[target[i]] = copyProperties(func, modifiedFunc);
		}

		return modifiedObj;
	};

	return {
		create: create
	};
}());
