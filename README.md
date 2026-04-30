# Juno Pay Widgets

End-to-end React checkout SDK, QR-code payment UI, public invoice polling, and theme utilities for Juno Pay Server frontends.

## Install

```bash
npm install github:JunoPayServer/junopay-widgets
```

Pin a release, tag, branch, or commit when you need a stable build:

```bash
npm install github:JunoPayServer/junopay-widgets#v0.3.0
```

The installed package name remains `@junopayserver/widgets`.

## GitHub Packages

The package is also published to GitHub Packages for private registry workflows:

```bash
npm install @junopayserver/widgets --registry=https://npm.pkg.github.com
```

## Usage

```tsx
import { JunoPayCheckoutFlow, createJunoPayClient } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";
```

## End-to-end checkout

Create invoices on your own server so the merchant API key never ships to the browser. Your endpoint should return the JunoPay `POST /v1/invoices` response body data:

```tsx
import { JunoPayCheckoutFlow, createJunoPayClient } from "@junopayserver/widgets";
import "@junopayserver/widgets/theme.css";

const junoPay = createJunoPayClient({ baseUrl: "https://pay.example.com" });

export function CheckoutButton() {
  return (
    <JunoPayCheckoutFlow
      client={junoPay}
      createInvoice={async () => {
        const res = await fetch("/api/junopay/invoices", { method: "POST" });
        if (!res.ok) throw new Error("checkout failed");
        return res.json();
      }}
      buttonLabel="Buy now"
      logoSrc="/juno-pay-server-logo.svg"
    />
  );
}
```

Use `JunoPayCheckout` directly when your app already owns invoice creation and polling.

The package ships compiled JavaScript and TypeScript declarations from `dist/`.
