"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { formatCountdown, formatJUNO } from "./format.js";
import { invoicePhase, isFullyPaid, isPaymentComplete, receivedTotalZat, secondsUntilExpiry } from "./invoice.js";
function PhasePill({ phase }) {
    const cfg = {
        awaiting_payment: { label: "Awaiting payment", cls: "th-border th-input th-muted" },
        pending_confirmations: { label: "Pending confirmations", cls: "border-amber-500/30 bg-amber-500/8 text-amber-400" },
        payment_complete: { label: "Payment complete", cls: "border-emerald-500/30 bg-emerald-500/8 text-emerald-400" },
        expired: { label: "Expired", cls: "border-red-500/30 bg-red-500/8 text-red-400" },
    };
    const v = cfg[phase];
    return _jsx("span", { className: `inline-flex items-center justify-center rounded-full border w-40 py-0.5 text-xs font-medium ${v.cls}`, children: v.label });
}
function CopyToast({ visible }) {
    return (_jsxs("div", { className: `fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-black/10 text-sm text-black shadow-xl transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`, children: ["Address Copied", _jsx("svg", { width: "14", height: "14", viewBox: "0 0 16 16", fill: "none", className: "shrink-0 text-emerald-500", children: _jsx("path", { d: "M3 8l4 4 6-7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })] }));
}
function CopyableAddress({ address }) {
    const [copied, setCopied] = useState(false);
    async function copy() {
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
        catch {
            setCopied(false);
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx(CopyToast, { visible: copied }), _jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [_jsxs("span", { className: "font-mono text-xs th-muted", children: [address.slice(0, 10), "...", address.slice(-10)] }), _jsx("button", { type: "button", onClick: () => void copy(), title: "Copy address", className: "shrink-0 th-faint hover:th-muted transition-colors", children: copied ? (_jsx("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", children: _jsx("path", { d: "M3 8l4 4 6-7", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) })) : (_jsxs("svg", { width: "13", height: "13", viewBox: "0 0 16 16", fill: "none", children: [_jsx("rect", { x: "5", y: "1", width: "9", height: "11", rx: "1.5", stroke: "currentColor", strokeWidth: "1.4" }), _jsx("path", { d: "M3 4H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-1", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round" })] })) })] })] }));
}
function OrderSummary({ invoice }) {
    return (_jsxs("div", { className: "grid grid-cols-1 gap-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs th-dim", children: "Amount" }), _jsxs("div", { className: "mt-1 text-sm font-medium th-text", children: [formatJUNO(invoice.amount_zat), " JUNO"] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs th-dim", children: "Deposit address" }), _jsx(CopyableAddress, { address: invoice.address })] })] }));
}
function QRModal({ address, expSec, logoSrc, onClose, }) {
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape")
                onClose();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm", onClick: onClose, children: _jsxs("div", { className: "relative rounded-2xl th-modal border th-border p-8 shadow-2xl flex flex-col items-center", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { type: "button", onClick: onClose, className: "absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full th-input th-muted hover:th-text transition-colors text-sm", children: "x" }), _jsx("div", { className: "mb-1 text-xl font-semibold th-text", children: "Scan to Pay" }), _jsx("div", { className: "mb-6 text-sm th-muted", children: "Use your JUNO wallet to scan" }), _jsx("div", { className: "rounded-xl overflow-hidden bg-white p-5", children: _jsx(QRCodeSVG, { value: address, size: 260, level: "H", imageSettings: logoSrc ? { src: logoSrc, width: 56, height: 56, excavate: true } : undefined }) }), expSec !== null && (_jsx("div", { className: "mt-4 text-xs th-muted", children: expSec === 0 ? "Expired" : `Expires in ${formatCountdown(expSec)}` })), _jsxs("div", { className: "mt-4 w-full max-w-[330px] text-center", children: [_jsx("div", { className: "text-[10px] font-semibold uppercase tracking-wider th-faint mb-1.5", children: "Deposit Address" }), _jsx("div", { className: "flex items-center justify-center", children: _jsx(CopyableAddress, { address: address }) })] })] }) }));
}
export function JunoPayCheckout({ invoice, confirmations = null, error = null, hidePhasePill = false, logoSrc, }) {
    const [nowMs, setNowMs] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNowMs(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const phase = useMemo(() => invoicePhase(invoice, nowMs), [invoice, nowMs]);
    const expSec = useMemo(() => secondsUntilExpiry(invoice.expires_at ?? null, nowMs), [invoice.expires_at, nowMs]);
    const totalReceived = useMemo(() => receivedTotalZat(invoice), [invoice]);
    const confirmationsText = useMemo(() => {
        const required = invoice.required_confirmations;
        if (!isFullyPaid(invoice) || isPaymentComplete(invoice))
            return null;
        if (confirmations === null)
            return `Confirmations: -/${required}`;
        const cur = Math.min(confirmations, required);
        return `Confirmations: ${cur}/${required}`;
    }, [confirmations, invoice]);
    const progress = useMemo(() => {
        const required = invoice.required_confirmations;
        if (!isFullyPaid(invoice) || isPaymentComplete(invoice) || confirmations === null)
            return null;
        const cur = Math.min(confirmations, required);
        if (required <= 0)
            return null;
        return Math.min(1, Math.max(0, cur / required));
    }, [confirmations, invoice]);
    const [qrOpen, setQrOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [qrOpen && _jsx(QRModal, { address: invoice.address, expSec: phase === "awaiting_payment" ? expSec : null, logoSrc: logoSrc, onClose: () => setQrOpen(false) }), _jsxs("div", { className: "rounded-2xl border th-border th-surface p-5", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("div", { className: "text-sm font-semibold th-text", children: "Checkout" }), !hidePhasePill && _jsx(PhasePill, { phase: phase })] }), error ? (_jsx("div", { className: "mt-3 rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2 text-xs text-red-400", children: error })) : null, _jsxs("div", { className: "mt-4 space-y-4", children: [_jsx(OrderSummary, { invoice: invoice }), _jsxs("button", { type: "button", onClick: () => setQrOpen(true), className: "w-full flex items-center justify-center gap-2 rounded-xl border th-border th-input hover:border-[#dc8548]/40 hover:text-[#dc8548] th-muted transition-colors py-3 text-sm font-medium", children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "shrink-0", children: [_jsx("rect", { x: "1", y: "1", width: "5", height: "5", rx: "0.5", stroke: "currentColor", strokeWidth: "1.2", fill: "none" }), _jsx("rect", { x: "2.5", y: "2.5", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "10", y: "1", width: "5", height: "5", rx: "0.5", stroke: "currentColor", strokeWidth: "1.2", fill: "none" }), _jsx("rect", { x: "11.5", y: "2.5", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "1", y: "10", width: "5", height: "5", rx: "0.5", stroke: "currentColor", strokeWidth: "1.2", fill: "none" }), _jsx("rect", { x: "2.5", y: "11.5", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "10", y: "10", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "13", y: "10", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "10", y: "13", width: "2", height: "2", fill: "currentColor" }), _jsx("rect", { x: "13", y: "13", width: "2", height: "2", fill: "currentColor" })] }), "Show QR Code"] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [phase === "awaiting_payment" && expSec !== null && expSec > 0 ? (_jsxs("div", { className: "text-xs th-dim", children: ["Expires in ", formatCountdown(expSec)] })) : null, phase === "pending_confirmations" && confirmationsText ? (_jsx("div", { className: "text-xs th-dim", children: confirmationsText })) : null] }), phase === "pending_confirmations" && progress !== null ? (_jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full th-input", children: _jsx("div", { className: "h-full bg-amber-500 transition-all", style: { width: `${Math.round(progress * 100)}%` } }) })) : null, !isFullyPaid(invoice) && phase !== "expired" ? (_jsxs("div", { className: "text-xs th-dim", children: ["Received: ", _jsxs("span", { className: "font-mono th-muted", children: [formatJUNO(totalReceived), " JUNO"] }), " /", " ", _jsxs("span", { className: "font-mono th-muted", children: [formatJUNO(invoice.amount_zat), " JUNO"] })] })) : null] })] })] }));
}
