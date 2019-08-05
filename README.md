# HEM's Monorepo

Any sites and apps somehow connected to HEM all in one place.

Based on `create-react-app`.

## Getting started

Set the project and type in `public/project-config.js`, e.g.:

        window.env = {
            PROJECT_TYPE: 'apps',
            PROJECT_NAME: 'breto',
        }

Then...

        yarn start:site

or

        yarn start:app

## Deployments

TBA

## Generator

__Component (with Redux)__

        `hygen module new [NAME]`

Then delete what you don't need, `mv` it into place.

__Store__

        `hygen store new store`

Then `mv` it into place.

\*___Note___: _Initially, there will some Typescript errors from the sample boilerplate not making assumptions about your state shape._
