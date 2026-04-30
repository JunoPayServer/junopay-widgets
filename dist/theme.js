const KEY = "juno_theme_v1";
function readCookie() {
    if (typeof document === "undefined")
        return null;
    const m = document.cookie.match(/(?:^|;\s*)juno_theme_v1=([^;]+)/);
    return m ? m[1] : null;
}
function writeCookie(t) {
    document.cookie = `${KEY}=${t};path=/;max-age=31536000;SameSite=Lax`;
}
export function getTheme() {
    if (typeof window === "undefined")
        return "dark";
    const cookie = readCookie();
    if (cookie)
        return cookie;
    // No cookie yet — promote localStorage value to cookie so the other app
    // (different port, same hostname) can read it on next load.
    const local = window.localStorage.getItem(KEY) ?? "dark";
    writeCookie(local);
    return local;
}
export function setTheme(t) {
    if (typeof window === "undefined")
        return;
    window.localStorage.setItem(KEY, t);
    writeCookie(t);
    document.documentElement.setAttribute("data-theme", t);
}
