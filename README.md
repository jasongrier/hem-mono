# HEM's Monorepo

Any sites and apps somehow connected to HEM all in one place.

Based on `create-react-app`.

## Running

Set the project and type in `public/project-config.js`, e.g.:

        window.env = {
            PROJECT_TYPE: 'apps',
            PROJECT_NAME: 'breto',
        }

Then...

        yarn start:site

or

        yarn start:app

## Tests

All tests are end-to-end tests.

App tests are written in mocha.

Due to some silly opinionatedness in CRA, app tests need to be wrapped in `if (DONT_HIDE_TESTS_FROM_CRA_TSC) {...}`.

Set your project config as described in "Running".

Then...

        yarn test:site

or

        yarn test:app

## Deployments

Set your project config as described in "Running".

Then...

        yarn build:site

or

        yarn build:app

Sites will get built into the `build` directory.

Apps will get built into the `dist` directory (with the web stuff still going into `build`).

## Generator

__Component (with Redux)__

        `hygen module new [NAME]`

Then delete what you don't need, `mv` it into place.

__Store__

        `hygen store new store`

Then `mv` it into place.

\*___Note___: _Initially, there will some Typescript errors from the sample boilerplate not making assumptions about your state shape._
