# h5p-topic-map

Empty project.

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build:prod
```

To create a development build:

```sh
npm run build:dev
```

## Semantics

When adding new fields to H5P's `semantics.json`, never change `semantics.json` itself, but rather update `./src/semantics.ts` and run `npm run generate-semantics` afterwards. This ensures strict typing of semantics.

For semantics generation watch mode, run `npm run watch-semantics`.

## Running

Open the file `dist/index.html` in your browser

## Testing

To run unit tests:

```sh
npm test
```

## Merging Strategy

In this project we use rebase merging without fast-forwarding when closing pull requests as standard. After completing the review process, close pull requests with the following steps:

1. Add new comment: `/rebase` to the pull request that is ready to be merged. Fix merge conflicts if there are any.
2. Click **Merge pull request** to close the pull request after github-actions bot force-pushed the branch (if a rebase was necessary).

Note: do not use **Rebase and merge** to avoid using fast-forwarding.

## Credits

Made with [createapp.dev](https://createapp.dev/). Generated by <https://github.com/NDLA-H5P/generator-h5p-content-type>.
