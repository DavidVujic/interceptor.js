/*global QUnit, interceptor*/
/* eslint-disable no-console */

(function () {

	var before = function (args) {
		console.log('(before) function args: ' + args);
	};

	var after = function (result) {
		console.log('(after) returned from function: ' + result);
	};

	var obj;

	QUnit.module('Interceptor tests', {
		setup: function () {
			obj = {
				myFunc: function (val) {
					return val;
				},
				mySecondFunc: function () {
				},
				myProp: 'A custom property'
			};

			obj.mySecondFunc.myVar = 'abc';
		},
		teardown: function () {
			obj = null;
		}
	});

	QUnit.test('global object added', function (assert) {
		assert.ok(interceptor, 'ok');
	});

	QUnit.test('intercept function in custom object', function (assert) {
		var result = interceptor.create(obj, before, after);

		result.myFunc('function in object');

		assert.ok(typeof result.myFunc === 'function');
		assert.ok(typeof result.mySecondFunc === 'function');
	});

	QUnit.test('intercept single function', function (assert) {
		var func = interceptor.create(obj.myFunc, before, after);

		func('single function');

		assert.ok(typeof func === 'function');
	});

	QUnit.test('intercepted object is not corrupt', function (assert) {
		var func = interceptor.create(obj, before, after);

		assert.ok(func.myProp === 'A custom property');
		assert.ok(typeof func.mySecondFunc === 'function');
		assert.ok(func.mySecondFunc.myVar === 'abc');
	});

	QUnit.test('intercepted function is not corrupt', function (assert) {
		var func = interceptor.create(obj.mySecondFunc, before, after);

		assert.ok(typeof func === 'function');
		assert.ok(func.myVar === 'abc');
	});

}());
