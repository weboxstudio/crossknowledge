# Testing with Meteor
![Meteor 1.3](http://info.meteor.com/hubfs/Blog/Meteor_1.3.png)



## What is a test?
* A set of processes aimed at investigating, evaluating and ascertaining the completeness and quality of computer software
* The most concrete form of documentation of expected behaviour for other developers



## Types of tests
* Unit test, if you are testing one small module of your application
* Integration test, if you are testing that multiple modules of your application works properly together
* Acceptance (end-to-end) test, if you are testing whether the flow of your application works as expected
* Load (stress) test, if you are testing your application under typical load or how much load it can handle before it falls over



## Testing in Meteor
<p style="text-align: left">The `meteor test` command loads the application in a special test mode</p>

1. Does NOT eagerly load any of our application code
2. Does eagerly load any file that looks like *.test[s] or *.spec[s]
3. Sets Meteor.isTest flag to true
4. Starts the test driver package

    A driver-package argument must be specified after the command
    
    The Meteor build tool and the meteor test command ignore any file located in the /tests directory.


## Driver packages
<p style="text-align: left">Mini application that runs in place of your app and runs each of your defined tests</p>

<p style="text-align: left; float: left; width: 50%">Web reporters, a Meteor application with a specific UI for showing test results</p><img style="width: 40%" src="http://guide.meteor.com/images/mocha-test-results.png" alt="Web reporter">

<p style="text-align: left">Console reporters, that run completely on the command line</p>