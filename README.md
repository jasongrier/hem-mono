# HEM's Monorepo

Any sites and apps somehow connected to HEM all in one place.

## Installation

        npm i

## Overview of commands

### Start a project for local dev

        npm start my-project

### Start the virtual MIDI tunnel

        npm start midi

### Run automated tests in a project

        npm test my-project

### Build a project

        npm run task build

### Lint a project

        npm run task lint my-project

### Lint all projects

        npm run task lint-all

### Run automated tests in all projects

        npm run task test-all

_Note: ATTOW the build task does not work. It is sufficient to run the start command and upload the contents of the `dist` directory to your server, however, React will not be in production mode._

## Virtual MIDI tunnel
