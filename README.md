# Test CRUD project from Julien Singler for HX


## Introduction
First, the subject doesn't say If I should consider a technology over others ? Neither if I should use Frameworks or not, so I'm considering I can.
Because HX is working with NodeJS, I'm orienting my development on NodeJS.
I was thinking about MEAN.IO but it would be like cheating.

I'm using expressjs, mongoose, apidoc.js and body-parser for express.

## Developer thought
If I had to create an API, for performance issues and long term maintenability I wouldn't use Javascript (implicitly NodeJS), for multiple reasons :

* NodeJS (JavaScript) is based on implicit asynchronous paradigms and some developers could be confused to develop with it server side. If you don't know about Promises / Callbacks, it's a kind of problems : will slow the development and bring errors you should not have.
* JavaScript is dynamc typed, which can be a problem if developers are not rigorous or don't name well their variables .. Especially with big teams ..
* Performance of JavaScript (even with v8 optimizations) are not comparable to compiled languages..
* JavaScript is a broken language, it still will be with ES6 as ES6 is just bringing more structure with syntactic sugar .. That's why alternatives like Dart or Typescript are really monitored by the community.
* Even with frameworks like ExpressJS, It's difficult to not get spaghetti code at a certain point in the developement.. Refactoring a big project is always risky. They obviously try to change that problem, Promises where the first step and modules are following this path. But in NodeJS when I see code like that, I can't stop wondering why they didn't do something like Python or Golang (which we could also criticize because of implicit Uppercases token export) :

```javascript
module.exports = function(width) {
  return {
    area: function() {
      return width * width;
    }
  };
}
```
## Steps
I'm going to do a RESTfull API, there is no real standard but more best practices, I will keep it simple.
I don't know in which environment you will deploy this (If you do), so don't forget to install these tools **OR USE THE DOCKER IF YOU CAN**:

* **npm**

I started by installing the expressjs : `npm install express --save`
Then Mongoosejs : `npm install mongoose --save`

I added bodyParser (as it's not given anymore by default in express) to treat json encoded and url encoded data :
`npm install body-parser --save`

I used apidoc.js to generate a nice documentation : `npm install apidoc -g`
Which you can find inside `apidoc/` folder, no need to serve it, it's only html with Javascript.

To start manually, you need to install `mongodb`, launch it : `mongod --config /usr/local/etc/mongod.conf` and then launch my app : `node ./api/index.js`

Then you can access to `http://localhost:4242/` which will answer you in json.
