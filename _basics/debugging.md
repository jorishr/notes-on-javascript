# Debugging in JavaScript

Table of contents

- [Debugging in JavaScript](#debugging-in-javascript)
  - [Console](#console)
    - [Log](#log)
    - [Dir](#dir)
    - [Table](#table)
    - [Computed variable names](#computed-variable-names)
    - [Console.trace](#consoletrace)
    - [Console.group](#consolegroup)
  - [Benchmarks](#benchmarks)
  - [Browser dev tools](#browser-dev-tools)

## Console

### Log

```js
console.log("<your-reference>", variable);
```

In the dev tools console you can use the _filter_ so that only your reference shows up.

### Dir

Use `console.dir()` to see all the properties of a specified JavaScript object. To see an object that is nested more than two levels deep you cannot use console.log(object) as it is limited. Use the options object of console.dir: `console.dir(object, {depth: null});`. Or set the depth to the limit you want.

### Table

Use `console.table()` to log large objects with only the relevant properties for better readability:

```js
let obj = [{...}, {...}, {...}]
console.table(obj, ['key1', 'key2', ...])
```

What you get is structured table that is easy to read.

### Computed variable names

If you log an object separately you get the object without its variable name in the log. To have better references in the log use computed variable names:

```js
const foo = {};
const bar = {};
console.log({ foo, bar });
//-> {foo: {...}, bar: {}} with all the properties.
```

### Console.trace

Use `console.trace()` to find out where in the code a function is _defined_ and _called_.

```js
const deleteUser = function () {
  //...
  console.trace("User deleted");
};
```

### Console.group

Group a series of `console.log` statements. They will be indented in the console for better readability.

```js
console.group("my group");
console.log(1);
console.log(2);
console.log(3);
console.groupEnd();
```

## Benchmarks

To find out how long it takes to run a particular part of your code you can use `console.time`.

```js
console.time("<label>");
//...
//<code>
//...
console.timeEnd("<label>");
```

## Browser dev tools

-> resources -> scripts

Set _line breakpoints_ so that the code pauses its execution so you can check the state of the program at any given time.
