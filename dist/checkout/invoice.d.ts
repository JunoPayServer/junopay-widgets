import type { JunoPayInvoice, JunoPayInvoiceEvent, JunoPayInvoicePhase } from "./types.js";
export declare function receivedTotalZat(inv: JunoPayInvoice): number;
export declare function isPaymentComplete(inv: JunoPayInvoice): boolean;
export declare function isFullyPaid(inv: JunoPayInvoice): boolean;
export declare function secondsUntilExpiry(expiresAt: string | null | undefined, nowMs: number): number | null;
export declare function invoicePhase(inv: JunoPayInvoice, nowMs: number): JunoPayInvoicePhase;
export declare function depositHeightForConfirmations(events: JunoPayInvoiceEvent[]): number | null;
export declare function confirmationsCount(bestHeight: number | null, depositHeight: number | null): number | null;
//# sourceMappingURL=invoice.d.ts.map