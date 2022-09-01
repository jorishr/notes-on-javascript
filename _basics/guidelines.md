# About JavaScript
ECMA is the European Computer Manufacturing Association, to help standardize the language in 1997, ECMASCRIPT I or ES I. Next up ES II(1998) and ES III(1999). ES V(2009). From ES VI(2015) onwards: yearly releases of new features with ES2015, 2016, 2017.

# Coding style guidelines
- Linting: Linting is a program that checks your code for errors, inconsistencies and bad practices. It can be configured as you want and there is no *one* standard to what is a good or bad practice, though there are widely accepted conventions and guidelines. 

You can use a plugin in VS Code locally: eslint, prettier.

To enforce it in projects you can install eslint and prettier as npm development dependencies in your project and have custom config files set up.

See websites documentation of Eslint and Prettier websites for install guides.

- Naming conventions
The crucial part here is to be consistent. Don't mix styles.

## Loading and executing JavaScript files
When the `<script>` tag is put between the `<head>` tags of an HTML tag *without attributes*, the JS file is downloaded and executed BEFORE the rest of the HTML content is parsed and rendered by the browser. This is problematic because most of the js code will depend on html elements for its execution. The simple work around is to put the `<script>` tags at the bottom of the `<body>` tag so that the js files get downloaded and executed after the other HTML content is loaded.

There is a better way however: use either the *async* or *defer* attribute. Doing so means you can keep the `<script>` tags between the `<head>` tags, which makes it easier to find them. When using *defer* you know for sure that the execution get deferred until the HTML content is loaded. Plus, all `<script>` tags are executed in the order as they appear between the `<head>` tags. 

*Async* will start the *download* of the js file *while* the HTML parsing continues. Though the HTML parsing gets interrupted once the js file is downloaded as the execution of the js file is done immediately. Multiple js files will be executed in their downloaded order, which is unpredictable.