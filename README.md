# InfiniteLimits Homepage

_Daniel Li_

This is the source repository for my personal website,
located at <https://inflmts.github.io>.

## Build

Install dependencies:

```
pnpm install
```

Build using Vite:

```
pnpm run build
```

## Deploy

The `deploy-github.mjs` script creates a temporary Git repository in `dist`,
creates a commit with the output files,
and force-pushes it to
<https://github.com/inflmts/inflmts.github.io>:

```
pnpm run deploy-github
```

## Generating Assets

When editing `generate-pattern.mjs`, regenerate `pattern.svg` using:

```
pnpm run generate-pattern
```
