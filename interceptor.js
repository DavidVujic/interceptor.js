/* exported interceptor */
var interceptor = (function () {
	'use strict';

	var toArray = function (args) {
		if (args.length === 1) {
			return [arguments[0]];
		}

		return Array.prototype.slice.call(arguments, 0);
	};

	var appendProperties = function (target, source) {
		var modified = target;
		var property;

		for (property in source) {
			if (!source.hasOwnProperty(property)) {
				continue;
			}

			if (!modified[property]) {
				modified[property] = source[property];
			}
		}

		return modified;
	};

	var intercept = function (source, property, before, after) {
		var original = source[property];

		return function () {
			var args = toArray(arguments);

			before(args);

			var result = original.apply(null, args);

			after(result);

			return result;
		};
	};

	var create = function (source, before, after) {
		var target = source;
		var property;

		for (property in source) {
			if (!source.hasOwnProperty(property)) {
				continue;
			}

			if (typeof source[property] === 'function') {
				target[property] = intercept(source, property, before, after);
				target[property] = appendProperties(target[property], source[property]);
			}
		}

		return target;
	};

	return {
		create: create
	};
}());
