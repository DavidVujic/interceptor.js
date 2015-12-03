/*global QUnit, interceptor*/

(function () {
	QUnit.module('object initialization');

	QUnit.test('is global object added', function (assert) {
		assert.ok(interceptor, 'ok');
	});

}());
