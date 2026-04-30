"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export function ErrorBanner({ message }) {
    return (_jsx("div", { className: "rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-400", children: message }));
}
