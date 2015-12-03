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

	var modifyTarget = function (target, source, before, after) {
		var staticProperty;

		target = intercept(source, before, after);

		for (staticProperty in source) {
			if (!source.hasOwnProperty(staticProperty)) {
				continue;
			}

			target[staticProperty] = source[staticProperty];
		}

		return target;
	};

	var create = function (source, before, after) {
		var target = source;
		var property;

		if (typeof source === 'function') {
			return modifyTarget(target, source, before, after);
		}

		for (property in source) {
			if (!source.hasOwnProperty(property)) {
				continue;
			}

			if (typeof source[property] === 'function') {
				target[property] = modifyTarget(target[property], source[property], before, after);
			}
		}

		return target;
	};

	return {
		create: create
	};
}());
