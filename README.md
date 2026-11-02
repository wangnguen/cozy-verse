# CozyVerse

A cozy space to study and focus: scenes, ambient sounds, music, a Pomodoro timer, tasks and notes in one browser tab.

The full plan (features, architecture, roadmap) is in [docs/PLAN.md](docs/PLAN.md).

## Requirements

- Node.js 22+
- pnpm

## Scripts

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `pnpm dev`          | Start the dev server on http://localhost:4000             |
| `pnpm build`        | Type-check, then build the static site into `dist/`       |
| `pnpm lint`         | Run ESLint, including the layer import rules              |
| `pnpm format`       | Format the whole project with Prettier                    |
| `pnpm format:check` | Check formatting without changing files                   |
| `pnpm test`         | Run unit tests with Vitest                                |
| `pnpm preview`      | Build, then serve `dist/` locally the way Cloudflare does |
| `pnpm deploy`       | Build, then deploy to Cloudflare Workers                  |
