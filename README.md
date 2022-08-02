# Persato Client Web

[![pipeline status](https://gitlab.com/clarityhub/persato/client-web/badges/master/pipeline.svg)](https://gitlab.com/clarityhub/persato/client-web/commits/master) [![coverage report](https://gitlab.com/clarityhub/persato/client-web/badges/master/coverage.svg)](https://gitlab.com/clarityhub/persato/client-web/commits/master)

## Getting Started

Checkout this repo to your Persato Workspace. Your workspace should look like this:

```md
 📁 persato
 ├- 📁 client-web
 ├- 📁 server-core
 ├- 📁 server-gateway
 ├- 📁 server-stream
 ⎣ docker-compose.yml
```

You can get the `docker-compose.yml` file from [the snippets](https://gitlab.com/clarityhub/persato/server-gateway/snippets) in `server-gateway`.

Once all folder are checked out, just run the following to launch all of them:

```sh
docker-compose up --build
```

If you have your `/etc/host` file set up, you can go to: [https://dashboard.clarityhub.app/](https://dashboard.clarityhub.app/).

## Node Versions

We are currently using:

* Node: v8.8.1
* NPM: v6.4.1

## Development

There are a few commands you can use to test the application:

```sh
npm run lint                # lint the project's files
npm run test                # run the unit tests for the project
npm run test:coverage       # generate a test coverage report
npm run test:stryker        # generate a report coverage passed on mutation testing
```
