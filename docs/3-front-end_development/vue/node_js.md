# node.js 

来源:https://nodejs.dev/learn

## start node.js server 

```js
const http=require('http');

const hostname='127.0.0.1';
const port=3000;
//get Server
const server=http.createServer((req,res)=>{
    // the statusCode property to 200, to indicate a successful response.
    res.statusCode=200;
    res.setHeader("Content-Type",'text/plain');
    // we close the response, adding the content as an argument to end():
    res.end('Hell world');
});
//listen
server.listen(port,hostname,()=>{
    //sout
    console.log('Server running at http://${hostname}:${port}/');
});

```

很明显,node.js是使用js写后端的.

包含:

[`http` module](https://nodejs.org/api/http.html).

the `createServer()` method of `http` creates a new HTTP server and returns it.

Whenever a new request is received, the [`request` event](https://nodejs.org/api/http.html#http_event_request) is called, providing two objects: a request (an [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) object) and a response (an [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) object).

[`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) :

The first provides the request details.

[`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) :

used to return data to the caller.

# introduction to Node.js

## this is something?

Node.js is an open-source and cross-platform JavaScript runtime environment. It is a popular tool for almost any kind of project!

Node.js runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser. 

### A Vast Number of Libraries

 over 1,000,000 open source packages 

## An Example Node.js Application

see start node.js server ;



## Node.js Frameworks and Tools

