/*global QUnit, interceptor*/
/* eslint-disable no-console */

(function () {

	var before = function (args) {
		console.log('before');
		console.log(args);
	};

	var after = function (result) {
		console.log('after');
		console.log(result);
	};

	var obj = {
		myFunc: function (val) {
			return val + ' this is a custom object';
		},
		myProp: 'A custom property'
	};

	QUnit.module('object initialization');

	QUnit.test('global object added', function (assert) {
		assert.ok(interceptor, 'ok');
	});

	QUnit.test('intercept custom object', function (assert) {
		var result = interceptor.create(obj, before, after);

		result.myFunc('hello');

		assert.ok(typeof result.myFunc === 'function');
	});

	QUnit.test('intercepted object is not corrupt', function (assert) {
		var result = interceptor.create(obj, before, after);

		assert.ok(result.myProp === obj.myProp);
	});

}());
