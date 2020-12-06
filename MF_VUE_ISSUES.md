# Vue Experiment: Overview & Outstanding Issues

## Storybook
Storybook is mainly an interaction between the designer and the frontend developer. Both the designer and the developer can start a local Storybook server, and proceed to develop components in isolation from the app. It should not be necessary to start Webpack and Django. Storybook is a way to audit components to gain agreement and settle confusion about design standards. We will not be using Storybook in the development of entire pages or complex features (yet).

#### TODOS
1. __DONE__ Get started with a simple button component
1. __DONE__ Add installation step to the README

## Webpack
Webpack needs to run in a separate terminal from Django and the Emulator. So, three terminals in all are required, four if one wants to run Storybook as well. (It's OK if developers want to use Procfiles or daemonisation, etc.) It is not known what will happen if one tries to run Webpack in a Docker container; for now just say we don't do that. It is not strictly necessary to run Webpack for a backend-only project, but this will depend on the degree of coupling between frontend and backend, and the practicality of developing the backend without making frontend changes or using Javascript's `console.log`/`debugger`.

Migration must occur one page at a time. This is because —like all Javascript SPA frameworks— the entire DOM tree is obliterated by the render process. This holds true even if only cosmetic/dumb elements like buttons or cards are used in a few places on the page; still, the entire page has to be migrated. Thus, migrations will have to be planned carefully. The role of a migrated Jinja template will be to serve as a kind of config file in which only a single (root) Vue component is declared, and some data gets rendered. (You ask: "But what about portals? in-place templates?" ...These methods lead to non-idomatic code structure —i.e.: not really a migration—, and are experimental _at best_ even in React, let alone Vue.)

Thus, more responsibility will fall upon frontenders to maintain a stable app. Backenders who indulge in frontend coding will have to get used to editing migrated pages in `/code/components/pages` while still dealing with normal Jinja templates for non-migrated pages.

#### TODOS
1. __DONE__ Get started with a local dev server
1. __DONE__ Serve it from within a Jinja template
1. __DONE__ Migrate a simple page
1. __DONE__ Flatten folder structure
1. __DONE__ Add installation step to the README
1. Rename `/public` to `webpack-public` to avoid confusion
1. Handle edge-cases wrt to rendering HTML `head` metadata, etc.
1. Migrate a non-backoffice UI; for example, onboarding

## Typescript

Vue introduces some significant degree of complexity to the codebase. It would be useful —maybe even essential— to have some familiar React features like jump-to-definition (especially for components), static type-checking of component props, and interfaces for data passed in from Django.

#### TODOS
1. Find out if Vue Typescript has jump-to-definition for components
1. Integrate Typescript

## Data and forms in Vue

Data has to get rendered by the server into a global POJO in a `script` tag. This should probably become a frontender's task. Alternatively (and better yet) some kind of data endpoint could be developed directly in Django views, skipping the need for potentially weird syntactical acrobatics when there are deep collections or other complex structures that would normally get rendered by Jinja. In many cases (e.g.: for strings and lists of strings) passing data this way is straightforward; but passing collections of objects is going to come with some overhead. Some of the objects we're using are _deep_ ...and decoupled, and these kinds of things will need to be manually spooled. If any property names change or new properties are needed then this must be manually updated. If any filtering needs to be applied (for example, currency formatting) then it has to happen either in the Django view prior to Jinja output, or else by doing some syntactical gymnastics in the `script` tag. It would be much better to just use API views, maybe to render the needed data via API view but render the JSON response into the `script` tag.

Furthermore, Django has several ways of sneaking highly contrived, tightly-coupled markup into Jinja templates. One obvious example is Django forms. It may be best in the complex case to render Django's entire form output and pass it as unsafe HTML to Vue, or to use AJAX. A simple form can probably be looped over and the essentials extracted (e.g.: Which element? What's its name?)

#### TODOS
1. __DONE__ Proof of concept, simple strings
1. __DONE__ Proof of concept, simple form
1. Proof of concept, collections of objects
1. Proof of concept, render API JSON in Jinja (deep collections/associations)
1. Proof of concept, form with sections/columns

## Dates

Javascript and Python have very different ways of dealing with dates. It's different at every level, from primitives, to precision, to formatting. There is no way around this.

#### TODOS
1. Example of pre-processing dates in Jinja
1. Example of sending a UTC date to Vue and formatting it on the Vue side

## Translations

Translations are handled by Django currently, both programmatically and in templates. It may be possible for Vue and Django to do translations independently of one another, but they will need to read from the same translation file somehow. For now, translations also need to be pre-processed and passed in via the `script` tag.

#### TODOS
1. Example of pre-processing translations in Jinja
1. Example of reading a `.po` file in Vue and doing translation on the Vue side

## What are the benefits, considering all this overhead?!

1. Consistent functionality and appearance across different pages
1. Simplified CSS codebase (it's getting messy)
1. Stop the proliferation of one-off Javascript files that duplicate each others' functionality
1. Use modern Javscript with confidence (`async/await`, generators, weak maps, `import`, etc)
1. Use Storybook
1. Write testable Javascript