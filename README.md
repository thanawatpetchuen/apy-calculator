## Description
APY calculator by real time data from Uniswap V3 using Subgraph

## Requirement
- Node.js (v18+)
- MongoDB

## Installation

```bash
$ yarn install
```

## Configuration
Required env variable with .env file
```
MONGODB_URI=mongodb://mongodb:27017/apy  # or mongodb://127.0.0.1:27017/apy
UNISWAP_SUBGRAPH_URL=https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3
```

## Running the app with Docker compose

```bash
$ docker compose -f docker-compose.dev.yaml up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deploy
Build a Docker contain with Dockerfile

```bash
docker build -t apy-calculator -f Dockerfile .
```

Push to container registry

```bash
docker push
```

## Author
- [Thanawat Petchuen](https://github.com/thanawatpetchuen)

