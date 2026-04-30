# Juno Pay Widgets

Shared React widgets and theme utilities for Juno Pay Server frontends.

The package can be installed directly from the public GitHub repository. No GitHub Packages login or npm token is required.

## Install

```bash
npm install github:JunoPayServer/junopay-widgets
```

Pin a release, tag, branch, or commit when you need a stable build:

```bash
npm install github:JunoPayServer/junopay-widgets#v0.1.2
```

The installed package name remains `@junopayserver/widgets`.

## GitHub Packages

The package is also published to GitHub Packages for private registry workflows:

```bash
npm install @junopayserver/widgets --registry=https://npm.pkg.github.com
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
