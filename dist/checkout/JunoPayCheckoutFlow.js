"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { JunoPayCheckout } from "./JunoPayCheckout.js";
import { useJunoPayInvoice } from "./useJunoPayInvoice.js";
export function JunoPayCreateInvoiceButton({ createInvoice, buttonLabel = "Pay with JunoPay", creatingLabel = "Creating checkout...", className = "", onInvoiceCreated, onError, }) {
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);
    async function startCheckout() {
        setCreateError(null);
        setCreating(true);
        try {
            const next = await createInvoice();
            onInvoiceCreated?.(next);
        }
        catch (e) {
            const message = e instanceof Error ? e.message : "create invoice failed";
            setCreateError(message);
            onError?.(message);
        }
        finally {
            setCreating(false);
        }
    }
    return (_jsxs("div", { className: className, children: [createError ? (_jsx("div", { className: "mb-3 rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2 text-xs text-red-400", children: createError })) : null, _jsx("button", { type: "button", disabled: creating, onClick: () => void startCheckout(), className: "btn-gold text-black font-semibold px-5 py-2 rounded-lg text-sm disabled:opacity-60", children: creating ? creatingLabel : buttonLabel })] }));
}
export function JunoPayCheckoutFlow({ createInvoice, client, initialInvoice = null, buttonLabel = "Pay with JunoPay", creatingLabel = "Creating checkout...", className = "", pollMs = 1000, hidePhasePill = false, logoSrc, onInvoiceCreated, onInvoiceUpdated, }) {
    const [checkout, setCheckout] = useState(initialInvoice);
    const input = useMemo(() => {
        if (!checkout)
            return null;
        return {
            invoice_id: checkout.invoice.invoice_id,
            invoice_token: checkout.invoice_token,
            cursor: checkout.next_cursor,
        };
    }, [checkout]);
    const live = useJunoPayInvoice(client, input, { pollMs });
    const invoice = live.invoice ?? checkout?.invoice ?? null;
    useEffect(() => {
        if (!live.invoice || !checkout)
            return;
        if (live.invoice.status === checkout.invoice.status &&
            live.invoice.received_zat_pending === checkout.invoice.received_zat_pending &&
            live.invoice.received_zat_confirmed === checkout.invoice.received_zat_confirmed &&
            live.invoice.updated_at === checkout.invoice.updated_at &&
            live.nextCursor === checkout.next_cursor) {
            return;
        }
        const next = { invoice: live.invoice, invoice_token: checkout.invoice_token, next_cursor: live.nextCursor };
        setCheckout(next);
        onInvoiceUpdated?.(next);
    }, [checkout, live.invoice, live.nextCursor, onInvoiceUpdated]);
    if (!invoice) {
        return (_jsx(JunoPayCreateInvoiceButton, { className: className, createInvoice: createInvoice, buttonLabel: buttonLabel, creatingLabel: creatingLabel, onInvoiceCreated: (next) => {
                const state = { invoice: next.invoice, invoice_token: next.invoice_token, next_cursor: "0" };
                setCheckout(state);
                onInvoiceCreated?.(next);
                onInvoiceUpdated?.(state);
            } }));
    }
    return (_jsx("div", { className: className, children: _jsx(JunoPayCheckout, { invoice: invoice, confirmations: live.confirmations, error: live.error, hidePhasePill: hidePhasePill, logoSrc: logoSrc }) }));
}
