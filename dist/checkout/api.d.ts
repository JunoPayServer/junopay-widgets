import type { JunoPayInvoice, JunoPayInvoiceEventsPage, JunoPayPublicInvoice, JunoPayResult, JunoPayStatusSnapshot } from "./types.js";
export type JunoPayCreateInvoiceInput = {
    external_order_id: string;
    amount_zat: number;
    metadata?: Record<string, unknown>;
};
export type JunoPayClientOptions = {
    baseUrl: string;
    merchantApiKey?: string;
    headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>);
    fetcher?: typeof fetch;
};
export type JunoPayClient = {
    createInvoice(input: JunoPayCreateInvoiceInput): Promise<JunoPayResult<JunoPayPublicInvoice>>;
    getPublicInvoice(input: {
        invoice_id: string;
        invoice_token: string;
    }): Promise<JunoPayResult<JunoPayInvoice>>;
    listPublicInvoiceEvents(input: {
        invoice_id: string;
        invoice_token: string;
        cursor?: string;
    }): Promise<JunoPayResult<JunoPayInvoiceEventsPage>>;
    getStatus(): Promise<JunoPayResult<JunoPayStatusSnapshot>>;
};
export declare function createJunoPayClient(options: JunoPayClientOptions): JunoPayClient;
//# sourceMappingURL=api.d.ts.map