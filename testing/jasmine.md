# Jasmine
Table of contents
- [Jasmine](#jasmine)
  - [Setup](#setup)
  - [Mocks and spies](#mocks-and-spies)
  - [Spy on existing function](#spy-on-existing-function)
  - [Creating a new spy dummy function](#creating-a-new-spy-dummy-function)
  - [Async testing](#async-testing)
## Setup
```js
describe("description", cb(){
	it("hatItIsOrDoes", cb(){
		expect().toBe()
	});	 
});
```
The content of the it function description is called a SPEC. Thus the DESCRIBE function has inside an IT function, which inside has an EXPECT function. The expect function returns an object to which we can attach other methods (.toBe).

MATCHERS are the result of the methods we attach to (the result of) the expect function.

The `.toBe()` matcher, for example, uses the `===` operator to compare the value passed to it to the result of the expect function. 

## Mocks and spies
Some function in your app will depend on previously executed functions or specific data. To mimic this functionality you can create a MOCK or SPY: an object that fakes the functionality of a function or data-object without the need for the real original object.

The mock or spy can also track the calls to the function and its parameters. 

Spies only exist within the describe or it block in which it is defined and are removed after each it block (spec).

There are specific matcher to work with spies.

## Spy on existing function
An existing function is attached to the global scope, the window object.
```js
function add (a, b, c){
  return a+b+c;
};

describe('add', () => {
  let add, spy;
  beforeEach(() => {
    addSpy = spyOn(window, 'add').and.callThrough(); 
    result = addSpy(1, 2, 3);
  });
```
## Creating a new spy dummy function
```js
//dummy fn that does nothing
describe('a setTimeout', () => {
  let sample;
  beforeEach(() => {
    sample = jasmine.createSpy('sampleFn'); 
    jasmine.clock().install()
  });
```
## Async testing
Time based testing with `jasmine.clock().instal()`
- initialize in a beforeEach
- uninstall in a afterEach

AJAX testing
- add a parameter to the beforeEach/afterEach or it('', (done) => {})
- a test will not complete until the 'done' function has been called
- jasmine has an internal timer that it runs before the test fails to make sure the test is not waiting to long. 
```js
function getUserInfo(username){
  return $.getJSON(`http://api.github.com/users/${username}`); 
};

describe('#getUserInfo', () => {
  it('returns the correct username', (done) => {  //add the done parameter
    getUserInfo('jorishr').then((data) => {
      expect(data.name).toBe('Joris Raymaekers');
    });
    done(); //invoke the callback to indicate the testing is done
  });
});
```