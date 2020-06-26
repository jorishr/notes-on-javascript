# Testing in Javascript
Table of contents
- [Testing in Javascript](#testing-in-javascript)
  - [About testing](#about-testing)
## About testing
Automated testing for Javascript  code is done with the help of frameworks like Jest or Jasmine.

- Unit testing: test parts or units of an application individually to make sure they behave as expected. 

- Test Driven Development: Write the tests before you write the application code. First write the tests and see them fail. Rewrite them to make them pass. Refactor to get the actual app code. This makes the dev process longer but leads -in theory- to more robust code.

- Integration testing builds on top the unit testing and looks the integration of the various parts. Thus you test more than one unit and how the units work together.

- Acceptance testing is testing the entire app how it behaves on a device or whether it satifies the specs provided.

- Stress testing is meant for evaluating how the app behavios under adverse conditions. For example, a very slow device or slow internet access, high traffic, interruptions, etc.