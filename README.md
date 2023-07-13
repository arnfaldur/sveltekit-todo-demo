# SvelteKit Todo Demo

A simple todo list webapp. Made using SvelteKit, Tailwind CSS, daisyUI, and SQLite.

## Developing

Make sure you have `node` and `npm` installed. I recommend `pnpm` as a space-efficient `npm` alternative.

Clone this repository to a local folder and change to that folder.

Install the required depnendencies with the command `npm install` (or `pnpm install` or `yarn`).

Then to start a development server run:

```bash
npm run dev
```

## Building

The production version is not significantly different to the development version.
To build a production version of the app run:

```bash
npm run build
```

And to host a server previewing it, run:

```bash
npm run preview
```

## Design

The application is based on the [`create-svelte`](https://www.npmjs.com/package/create-svelte) project scaffolding.
I chose tailwind as I am familiar with vuetify which is based on it.
Alongside tailwind, daisyUI reduced the number of design decisions that I had to make, helping me give the UI an simple and elegant look.

The simplicity of the app meant that there wasn't need for much compartmentalization.
There is only one component: TodoEntry. It manages the UI and behavior of each todo entry.

SvelteKit provides tools to make separate serverside and clientside code, as well as tools to define API endpoints.
As the data that is being sent back and forth is small, it is re-sent in it's entirety on each update.
This is obviously inefficient but works well enough for the project and avoids potentially brittle state mirroring logic.

NPM has a SQLite package that made it easy to set up database storage.
Every user action immediately triggers a corresponding database update.
In a larger project the load on the database could become too high.
In that case an in-memory storage could be added as an intermediary which is then periodically flushed to the database.
