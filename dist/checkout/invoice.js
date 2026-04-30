export function receivedTotalZat(inv) {
    return (inv.received_zat_pending ?? 0) + (inv.received_zat_confirmed ?? 0);
}
export function isPaymentComplete(inv) {
    return (inv.received_zat_confirmed ?? 0) >= inv.amount_zat;
}
export function isFullyPaid(inv) {
    return receivedTotalZat(inv) >= inv.amount_zat;
}
export function secondsUntilExpiry(expiresAt, nowMs) {
    if (!expiresAt)
        return null;
    const t = Date.parse(expiresAt);
    if (!Number.isFinite(t))
        return null;
    const diff = Math.floor((t - nowMs) / 1000);
    return diff < 0 ? 0 : diff;
}
export function invoicePhase(inv, nowMs) {
    const exp = secondsUntilExpiry(inv.expires_at, nowMs);
    if (exp === 0 && !isFullyPaid(inv))
        return "expired";
    if (isPaymentComplete(inv))
        return "payment_complete";
    if (isFullyPaid(inv))
        return "pending_confirmations";
    return "awaiting_payment";
}
export function depositHeightForConfirmations(events) {
    let h = null;
    for (const e of events) {
        const dh = e.deposit?.height;
        if (typeof dh !== "number")
            continue;
        if (!Number.isFinite(dh))
            continue;
        if (h === null || dh > h)
            h = dh;
    }
    return h;
}
export function confirmationsCount(bestHeight, depositHeight) {
    if (bestHeight === null || depositHeight === null)
        return null;
    if (!Number.isFinite(bestHeight) || !Number.isFinite(depositHeight))
        return null;
    const confs = Math.floor(bestHeight) - Math.floor(depositHeight) + 1;
    return confs < 0 ? 0 : confs;
}
