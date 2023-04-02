## Pet Universe, Online Pet Store

##### Project: SENG4640, Web Applications
##### Authors: Trevor Drayton, Sanyam Gupta

## About 

Welcome to Pet Universe documentation!

There are a few things I want to lay out for you:
1. React components are documented under "Classes" using upper camel case.
2. The mongoose schemas are also documented under "Classes" using lower camel case, ending in 'Schema'.
3. The models are documented under "Modules" using upper camel case, ending in 'Model'.
4. The server file is also mentioned under Modules, namely "Server". But, the middleware in the server file is documented under "Namespaces" and "routes".

## Running the Application
1. Download the files into your IDE (we used Visual Studio Code)
2. ```npm install```
3. Cd to lists/src/server
4. ```npm run build```
5. ```node server.js```

## Generating and Viewing Documentation
1. Cd to lists/src/ 
2. ```jsdoc -c jsdoc.json```
3. ```start docs/index.html```
4. Alternatively, from lists/src/docs open `index.html` (entire docs folder is required).
