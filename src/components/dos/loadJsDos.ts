// js-dos (542 KB script + 40 KB CSS) used to be a render-blocking <script> in
// <head> for every visitor. Only the DOS games need it, so it is loaded the
// first time one opens.

let loading: Promise<void> | null = null;

export default function loadJsDos(): Promise<void> {
    if (loading) return loading;

    const base = `${process.env.PUBLIC_URL}/js-dos/`;
    loading = new Promise((resolve, reject) => {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = `${base}js-dos.css`;
        document.head.appendChild(style);

        const script = document.createElement('script');
        script.src = `${base}js-dos.js`;
        script.async = true;
        script.onload = () => {
            // @ts-ignore - global defined by js-dos.js
            window.emulators.pathPrefix = base;
            resolve();
        };
        script.onerror = () => {
            loading = null;
            reject(new Error('js-dos failed to load'));
        };
        document.head.appendChild(script);
    });
    return loading;
}
