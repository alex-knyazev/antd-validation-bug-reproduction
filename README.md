# Development experience

We use eslint to check code style and prettier for formatting.

Extensions fo vs code:

1. Eslint - linting
2. Prettier - formatting

Recommended Vs code settings:

```
"eslint.enable": true,
"editor.formatOnSave": true,
"eslint.autoFixOnSave": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
],
```

# Git workflow

[**Read about our git workflow!!!!!!!!**](./GIT_WORKFLOW.md)

# Agreements

## API requests.

All requests to server must go through [api groups](./src/api/groups).

Here you need to have function which uses [apiProvider](./src/api/apiProvider.js) to make request.

Example of API request you cam find in [./src/api/groups/auth/login.js](./src/api/groups/auth/login.js).

## Components.

UI React Components are separated into common and specific.

Common components know nothing about app business logic. It's like UI library components.

All common commonents should be placed to [./src/components/common](./src/components/common)

All app directory names, icluding components directories, are started with lower case and named using camelCase. We do it to support good developer experience for potential windows developers, where directory name isn't depend on case,

All react components should be named using PascalCase. They must be exported using named export, not default (for better dev experience in vs code).

We are using functional components as well as it possible and use class components only in special cases (such as using refs). [https://ru.reactjs.org/docs/hooks-effect.html](https://ru.reactjs.org/docs/hooks-effect.html)

For class names we are using React-BEM like naming agreements: [https://ru.bem.info/methodology/naming-convention/#%D1%81%D1%82%D0%B8%D0%BB%D1%8C-react](https://ru.bem.info/methodology/naming-convention/#%D1%81%D1%82%D0%B8%D0%BB%D1%8C-react)
Component is always like block, all inside of it - elements. WE use less nesting only for simple cases: hover, focuses, list items, etc.

## About work with date

By default, work with the date is in the format of a dayjs, when sent to the server, the date is converted to ISO format.
