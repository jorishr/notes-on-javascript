function ToPrimitive(input, preferredType){
  
  switch (preferredType){
    case Number:
      return toNumber(input);
      break;
    case String:
      return toString(input);
      break
    default:
      return toNumber(input);  
  }
  
  function isPrimitive(value){
    return value !== Object(value);
  }

  function toString(){
    if (isPrimitive(input.toString())) return input.toString();
    if (isPrimitive(input.valueOf())) return input.valueOf();
    throw new TypeError();
  }

  function toNumber(){
    if (isPrimitive(input.valueOf())) return input.valueOf();
    if (isPrimitive(input.toString())) return input.toString();
    throw new TypeError();
  }
}

/* 
[[ToPrimitive]] is passed with an input value and preferred type of conversion:
Number or String.preferredType is optional.

Both numeric and string conversion make use of two methods of the input object: 
valueOf and toString.Both methods are declared on Object.prototype and thus 
available for any derived types, such as Date, Array, etc.

In general the algorithm is as follows:

1. If input is already a primitive, do nothing and return it.
2. Call input.toString(), if the result is primitive, return it.

3. Call input.valueOf(), if the result is primitive, return it.

4. If neither input.toString() nor input.valueOf() yields primitive, 
throw TypeError.

Numeric conversion first calls valueOf(3) with a fallback to toString(2).String
conversion does the opposite: toString(2) followed by valueOf(3).

Most built -in types do not have valueOf, or have valueOf returning this object
itself, so it’s ignored because it’s not a primitive.That’s why numeric and 
string conversion might work the same — both end up calling toString().

Different operators can trigger either numeric or string conversion with a help
of preferredType parameter.But there are two exceptions: loose equality == and 
binary + operators trigger default conversion modes(preferredType is not 
specified, or equals to default ).In this case, most built -in types assume 
numeric conversion as a default, except Date that does string conversion. 

Here is an example of Date conversion behavior:
*/
let d = new Date();

// get string representation
let str = d.toString();  // 'Wed Jan 17 2018 16:15:42'

// get numeric representation, num of milliseconds since Unix epoch
let num = d.valueOf();   // 1516198542525

// compare with a string representation
// true because d is converted to same string
console.log(d == str);   // true

// compare with numeric representation
// false, because d is not converted to a number via valueOf()
console.log(d == num);   // false

// Result is 'Wed Jan 17 2018 16:15:42Wed Jan 17 2018 16:15:42'
// '+' same to '==' triggers default conversion mode
console.log(d + d);

// Result is 0, since '-' operator explicitly triggers numeric conversion, not 
// a default one
console.log(d - d);

// You can override the default toString() and valueOf() methods to hook into 
// object-to-primitive conversion logic.

var obj = {
    prop: 101,
    toString(){
      return 'Prop: ' + this.prop;
    },
    valueOf() {
      return this.prop;
    }
  };
  
  console.log(String(obj));  // 'Prop: 101'
  console.log(obj + '')      // '101'
  console.log(+obj);         //  101
  console.log(obj > 100);    //  true

/*
Notice how obj + ‘’ returns ‘101’ as a string. + operator triggers a default 
conversion mode, and as said before Object assumes numeric conversion as a 
default, thus using the valueOf() method first instead of toString(). */