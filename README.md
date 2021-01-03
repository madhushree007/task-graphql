# List of Github Repository with Graphql

The app renders the list of Javascript repositoires using github graphql API. There is 'Load More' button which fetches more data. The docker image has been created and available on docker hub.

## Tech Stack

```
♦ React 
♦ TypeScript
♦ Apollo Client
♦ Docker

```
## Lintig and Formating

ESlint has been used for linting and Prettier has been used for code formatting. Husky and lint-staged prevents ESLint and formatting errors from being committed.

### Instructions to run the app from Github

1. Fork & clone this repo 🍴

2. cd task-graphql and run npm i

3. npm start

4. npm test

### Instructions to run the app from Docker hub

1. Login to docker hub

2. docker pull madhushree25/graphql:graphql

3. docker run -p 3001:3000 madhushree25/graphql:graphql