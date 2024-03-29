/* 
  CREATE A CUSTOM LOOP
 
  Write a higher-order function loop that provides something like a for loop 
  statement. It takes a value, a test function, an update function, and a body
  function. 

  Each iteration, it first runs the test function on the current loop value and 
  stops if that returns false. This is basically how a normal loop works.

  Then it calls the body function, giving it the current value. 

  Finally, it calls the update function to create a new value and starts from 
  the beginning.

  When defining the function, you can use a regular loop to do the actual 
  looping.

  for(let i = 0; i < n; i++)

  loop(3, n => n > 0, n => n - 1, console.log);
  → 3
  → 2
  → 1 
*/

function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
      body(value);
    }
};

loop(3, n => n > 0, n => n - 1, console.log);

/* 
  parameters: start is the start value, test is the testFunction,
  updateFunction, bodyFunction; where value = the given value (3).
*/