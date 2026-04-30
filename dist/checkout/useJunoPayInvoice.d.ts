import type { JunoPayClient } from "./api.js";
import type { JunoPayInvoice, JunoPayInvoiceEvent } from "./types.js";
export type JunoPayLiveInvoice = {
    invoice: JunoPayInvoice | null;
    bestHeight: number | null;
    confirmations: number | null;
    depositHeight: number | null;
    events: JunoPayInvoiceEvent[];
    nextCursor: string;
    loading: boolean;
    error: string | null;
};
export declare function useJunoPayInvoice(client: Pick<JunoPayClient, "getPublicInvoice" | "getStatus" | "listPublicInvoiceEvents"> | null, input: {
    invoice_id: string;
    invoice_token: string;
    cursor?: string;
} | null, opts?: {
    pollMs?: number;
}): JunoPayLiveInvoice;
//# sourceMappingURL=useJunoPayInvoice.d.ts.map