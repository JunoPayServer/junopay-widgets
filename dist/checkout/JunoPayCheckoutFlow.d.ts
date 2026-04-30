import type { JunoPayClient } from "./api.js";
import type { JunoPayInvoice, JunoPayPublicInvoice } from "./types.js";
export type JunoPayCheckoutFlowState = {
    invoice: JunoPayInvoice;
    invoice_token: string;
    next_cursor: string;
};
export declare function JunoPayCreateInvoiceButton({ createInvoice, buttonLabel, creatingLabel, className, onInvoiceCreated, onError, }: {
    createInvoice: () => Promise<JunoPayPublicInvoice>;
    buttonLabel?: string;
    creatingLabel?: string;
    className?: string;
    onInvoiceCreated?: (invoice: JunoPayPublicInvoice) => void;
    onError?: (error: string) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function JunoPayCheckoutFlow({ createInvoice, client, initialInvoice, buttonLabel, creatingLabel, className, pollMs, hidePhasePill, logoSrc, onInvoiceCreated, onInvoiceUpdated, }: {
    createInvoice: () => Promise<JunoPayPublicInvoice>;
    client: Pick<JunoPayClient, "getPublicInvoice" | "getStatus" | "listPublicInvoiceEvents">;
    initialInvoice?: JunoPayCheckoutFlowState | null;
    buttonLabel?: string;
    creatingLabel?: string;
    className?: string;
    pollMs?: number;
    hidePhasePill?: boolean;
    logoSrc?: string;
    onInvoiceCreated?: (invoice: JunoPayPublicInvoice) => void;
    onInvoiceUpdated?: (state: JunoPayCheckoutFlowState) => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=JunoPayCheckoutFlow.d.ts.map