# Unit testing


## What's unit testing?
Unit testing is the process of isolating a single module and then testing that it works as you expect.

By doing this, we can write  __*fast*__  and __*accurate*__ tests.


## Unit testing in Meteor
Meteor recommends **Mocha** as test runner alongside the assertion library **Chai**.
- Mocha: https://mochajs.org
- Chai: http://chaijs.com


## How to test 
Running `meteor test` loads our application in "test mode".


### What happens?
Test mode loads any file in our application that look like **`*.test[s].*`**, or **`*.spec[s].*`**, ignoring any files including those located in any **`tests/`** directory.


# Let's test!


First we need to add Mocha package to our app
```node 
meteor add practicalmeteor:mocha
```


Assuming that we have split our application in *smart and reusable components*, we can start writing some test.

There is a simple module named Foo.
```javascript
export class Foo {
  constructor(Meteor) {
    this.Meteor = Meteor;
  }
  bar() {
    return "woo!";
  }
  doSomething() {
    this.Meteor.call("something", this.bar());
  }
}
```


In our file test, we first need to import the module:
```
import {Foo} from "../foo";
```


Then we write a test that verifies the module behavior for the first method:
```javascript
describe("Foo", () => {
  it("returns woo", function() {
    let foo = new Foo(); // we create an instance of Foo
    let bar = foo.bar(); // we run bar()
    
    // lastly we assert that the value we got from bar() is "woo!"
    expect(bar).to.equal("woo!"); 
  });
});
```


Foo has another method called **doSomething** that makes a call to a Meteor method called "something" and passes it the value of `bar()`.


Now we are going to write a test double for the `Meteor.call` method that will let us *spy** on how this method is used by our code under test.


**spy: Using SinonJS (http://sinonjs.org/)*

### What is a spy?
A test spy is a function that records `arguments`, `return` value, the value of `this` and exception thrown. A test spy can be an anonymous function or it can wrap an existing function.
So test spies are useful to test callbacks.


```javascript
let Meteor;
beforeEach(function() {
// this spy lets us observe all the things about how a function 
// is used and how it behaves during the test.
  Meteor = {
    call: sinon.spy()
  };
});

it("does something", function() {
  let foo = new Foo(Meteor);
  foo.doSomething();
  // we assert that the Meteor.call method was called 
  // with the arguments "something" and "woo!"
  expect(Meteor.call).to.have.been.calledWith("something", "woo!");
});
```


If we run our test runner:
```
foo
    returns woo
    does something

2 passing (2ms)
```


### YAY!


Sources:
- Github: https://github.com/pcorey/hello-meteor-modules/blob/master/tests/foo.js

- Meteor Guide: http://guide.meteor.com/testing.html

- Unit testing with Meteor 1.3 : http://blog.east5th.co/2015/12/21/unit-testing-with-meteor-1.3/