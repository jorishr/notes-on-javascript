# Promises with Fetch
Table of contents
- [Promises with Fetch](#promises-with-fetch)
  - [Fetch API](#fetch-api)
    - [Github example](#github-example)
      - [Refactored example](#refactored-example)
  - [Error handling](#error-handling)
## Fetch API
Fetch data from a server with browser native Fetch API. The function `fetch()` makes a network request to the url and returns a promise.

The promise resolves with a response object when the remote server responds with headers, BEFORE the full response is downloaded. To read the full response, we should call the method `response.text()` method or `response.json()` method if that is available in the remote api.
```js
let promise = fetch(url);

promise
  .then(function(response) {
    //return response.text();
	  return response.json;
  })
```
### Github example
For instance, we can make one more requests to GitHub, load the user profile and show the avatar image for 3 seconds.
```js
let url = '/article/promise-chaining/user.json';

fetch(url)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000);
  });
```
However, there's a potential problem in it, a typical error for those who begin to use promises. After showing the avatar, you cannot chain on anymore then methods. To MAKE THE CHAIN EXTENDABLE, we need to return a promise that resolves when the avatar finishes showing.

As a good practice, an asynchronous action should always return a promise. That makes it possible to plan actions after it; even if we don't plan to extend the chain now, we may need it later.

Wrap the last then method into a new promise.
```js
.then(githubUser => new Promise(function(resolve, reject) {   
	let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);
  setTimeout(() => {
    img.remove();
    resolve(githubUser); 
  }, 3000);
}))
.then(githubUser => alert(`Finished showing ${githubUser.name}`));
```
#### Refactored example
```js
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

//compile functions:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`))
	.catch(err => console.log(err));
```
## Error handling
The easiest way to catch all errors is to append a catch method to the end of the promise chain. Normally, such a catch method doesn't trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it. The final catch method not only catches explicit rejections, but also accidental errors in the handlers above. If the error is not handled JS will throw a global error in the console.