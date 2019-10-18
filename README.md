# HEM's Monorepo

Any sites and apps somehow connected to HEM all in one place.

## Getting started

        npm i

### Website

        npm start site [folder-name]

### Electron

        npm start app [folder-name]

## Test

        npm test site [folder-name]

        ––or––

        npm test app [folder-name]

## Build

        npm run build site [folder-name]

        ––or––

        npm run build app [folder-name]

_Note: ATTOW the build task does not work. For sites, it is sufficient to run the start command and upload the contents of the `dist` directory to your server._

## Active Projects / Sanity Checks

(In the case that core changes are made to the repository, framework, or common files, these projects _must_ be manually checked. Just cut and paste the commands below and see they still runs.)

1. `npm start app midst`
1. `npm start app midst-player`
1. `npm start app seurat`
1. `npm start site jasongrier`
1. `npm start site midst-journal`
