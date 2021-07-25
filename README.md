# weather-app

This is an application for making reservations

## Features

-   fetch any number of companies with reservations slots
-   allow on one reservation for each company
-   reservation from one company block time slot for other companies
-   allow for reservations revoke

## Development

Company reservations data are fetched using json-server.

During development each commit is checked for linting and each push is checked for tests.

You should first clone repo with command:

```
git clone git@github.com:arkadiusz-sapek/reservations-app.git
```

After that you should create `.env` file in root folder. For development you can copy content of `.env.template`

Then you need to install dependencies:

```
yarn
```

Run mocked development server:

```
yarn server
```

And finally run frontend:

```
yarn start
```

### Frontend scripts list

To install packages you need to run:

```
yarn
```

To run tests you need to run:

```
yarn test
```

Run e2e tests with Cypress Test Runner:

```
yarn test:cypress
```

Run e2e tests headlessly in console:

```
yarn test:e2e
```

To run mocked development server you need to run:

```
yarn server
```

You can run types check and eslint with:

```
yarn lint
```

Build production app:

```
yarn build
```
