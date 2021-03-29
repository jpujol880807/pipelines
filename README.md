# pipelines
Rest API with Node + Express + Typescript

## Requirements

Server: `Node 14.16.0 or higher, npm and nodemon`
Database `Mongo DB 4.4.4 or higher`
```shell script
npm i -g nodemon
```
## Installation steps
### 1. Setting up the environment
Create a .env file on project root and place your local configuration for the following params.
```dotenv
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DATABASE=pipelines
PORT=3000
```
### 3 Install dependencies
Run in terminal
```shell script
npm install
```

### 4 Start the development server
Run in Terminal
```shell script
npm run dev
```
The server will start listening on configured port and connected to the database



