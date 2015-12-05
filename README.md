A lightweight library for intercepting JavaScript functions.

Example usages: for unit testing void functions and being able to keep track on how many calls have been made, or for logging purposes.

# Example code

Here's a JavaScript object.

```javascript
var obj = {
  myFunc: function (val) {
    return val;
  }
};
```

In this scenario, we want to run code before and after a function is executed.

```javascript
var before = function (args) {
  console.log('Before function is run. args: ' + args);
};

var after = function (result) {
  console.log('After function is run. result: ' + result);
};
```
Pass the object to the interceptor, along with function name (as a string) or names (as an array).

```javascript
var interceptedObj = interceptor.create(obj, 'myFunc' before, after);
```

Use the intercepted object.

```javascript
var result = interceptedObj.myFunc('Hello world');
```
