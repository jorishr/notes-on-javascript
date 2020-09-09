# Jest
Table of contents
- [Jest](#jest)
  - [Install and setup](#install-and-setup)
  - [Writing tests](#writing-tests)
  - [Express integration testing](#express-integration-testing)
## Install and setup
```
npm i -D jest

//update the package.json:
	
"test": "jest"
"test": "jest --coverage"

jest --init

jest --watch
//watch mode will detect changes and run the test immediately.
```
The coverage flag will generate a new folder with an html file that visually indicates what has been tested.

For each script file you want to test, create a new file `<name>.test.js`.

## Writing tests
See official documentation for list of available methods.
```js
describe('True is true test', () => {
	test('checks that true is true', () => {
		const expected = true;
		const actual = true;
		expect(actual).toEqual(expected);
	});
});

//export from the actual JS file:
module.exports = (num) => {
    if((num % 3 === 0) && (num % 5 === 0)) return 'fizzBuzz';
    if(num % 3 === 0) return 'fizz';
    if(num % 5 === 0) return 'buzz';
    return num;
}
//import the functionality from the actual JS file:

const fizzBuzz = require('./fizzBuzz.js')
```

## Express integration testing
Use the package `superset` for creating HTTP requests. 

See my Github for working example:
[Express Integration Testing](https://github.com/jorishr/express-integration-testing)