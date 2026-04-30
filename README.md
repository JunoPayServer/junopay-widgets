# Juno Pay Widgets

Shared React widgets and theme utilities for Juno Pay Server frontends.

The package is published to GitHub Packages as `@junopayserver/widgets`.

## Install

Authenticate npm against GitHub Packages before installing:

```bash
npm login --scope=@junopayserver --registry=https://npm.pkg.github.com
```

Use your GitHub username and a personal access token with `read:packages`.

Install the package:

```bash
npm install @junopayserver/widgets --registry=https://npm.pkg.github.com
```

For a project-level npm config, add this to `.npmrc`:

```ini
@junopayserver:registry=https://npm.pkg.github.com
```

Then install normally:

```bash
npm install @junopayserver/widgets
```

## Usage

```tsx
import { JunoPayLogo, ThemeToggle } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";
```

Example:

```tsx
import { JunoPayLogo, ThemeToggle } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";

export function Header() {
  return (
    <header>
      <JunoPayLogo />
      <ThemeToggle />
    </header>
  );
}
```

The package ships compiled JavaScript and TypeScript declarations from `dist/`.
