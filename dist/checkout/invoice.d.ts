import type { JunoPayInvoice, JunoPayInvoicePhase } from "./types.js";
export declare function receivedTotalZat(inv: JunoPayInvoice): number;
export declare function isPaymentComplete(inv: JunoPayInvoice): boolean;
export declare function isFullyPaid(inv: JunoPayInvoice): boolean;
export declare function secondsUntilExpiry(expiresAt: string | null | undefined, nowMs: number): number | null;
export declare function invoicePhase(inv: JunoPayInvoice, nowMs: number): JunoPayInvoicePhase;
//# sourceMappingURL=invoice.d.ts.map