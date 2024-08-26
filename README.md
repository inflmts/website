# InfiniteLimits Homepage

Daniel Li

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

`deploy-github.mjs` is a script that creates a temporary Git repository
with a single commit containing the output files,
then force-pushes it to
<https://github.com/inflmts/inflmts.github.io>:

```
pnpm run deploy-github
```
