# Juno Pay Widgets

Shared React widgets, QR-code checkout, and theme utilities for Juno Pay Server frontends.

## Install

```bash
npm install github:JunoPayServer/junopay-widgets
```

Pin a release, tag, branch, or commit when you need a stable build:

```bash
npm install github:JunoPayServer/junopay-widgets#v0.2.0
```

The installed package name remains `@junopayserver/widgets`.

## GitHub Packages

The package is also published to GitHub Packages for private registry workflows:

```bash
npm install @junopayserver/widgets --registry=https://npm.pkg.github.com
```

## Usage

```tsx
import { JunoPayCheckout, JunoPayLogo, ThemeToggle } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";
```

Checkout example:

```tsx
import { JunoPayCheckout } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";

export function Checkout({ invoice }) {
  return <JunoPayCheckout invoice={invoice} logoSrc="/juno-pay-server-logo.svg" />;
}
```

The package ships compiled JavaScript and TypeScript declarations from `dist/`.
