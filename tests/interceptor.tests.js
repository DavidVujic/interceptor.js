/*global QUnit, interceptor*/
/* eslint-disable no-console */

(function () {

	function before(args) {
		console.log('(before) function args: ' + args);
		before.called = true;
	}

	function after(result) {
		console.log('(after) returned from function: ' + result);
		after.called = true;
	}

	var obj;

	QUnit.module('Interceptor tests', {
		setup: function () {

			before.called = false;
			after.called = false;

			obj = {
				myFunc: function (val) {
					return val;
				},
				mySecondFunc: function () {},
				myProp: 'A custom property'
			};

			obj.mySecondFunc.myVar = 'abc';
		},
		teardown: function () {
			obj = null;
		}
	});

	QUnit.test('return value is not modified', function (assert) {
		var intercepted = interceptor.create(obj, 'myFunc', before, after);

		var input = 'hello';
		var expected = obj.myFunc(input);
		var result = intercepted.myFunc(input);

		assert.equal(expected, result);
	});

	QUnit.test('return values are not modified', function (assert) {
		var intercepted = interceptor.create(obj, ['myFunc', 'mySecondFunc'], before, after);

		var input = 'hello';
		var expected1 = obj.myFunc(input);
		var result1 = intercepted.myFunc(input);

		var expected2 = obj.mySecondFunc();
		var result2 = intercepted.mySecondFunc();

		assert.equal(expected1, result1);
		assert.equal(expected2, result2);
	});

	QUnit.test('before and after functions are called', function (assert) {
		var intercepted = interceptor.create(obj, 'myFunc', before, after);

		intercepted.myFunc('hello world');

		assert.equal(before.called, true);
		assert.equal(after.called, true);
	});

	QUnit.test('after function is not called', function (assert) {
		var intercepted = interceptor.create(obj, 'myFunc', before);

		intercepted.myFunc('hello world');

		assert.equal(before.called, true);
		assert.equal(after.called, false);
	});

	QUnit.test('intercepted object is not corrupt', function (assert) {
		var intercepted = interceptor.create(obj, 'mySecondFunc', before, after);

		assert.ok(intercepted.myProp === 'A custom property');
		assert.ok(intercepted.mySecondFunc.myVar === 'abc');
	});


}());
