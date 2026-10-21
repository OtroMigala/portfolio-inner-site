import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import strings from './strings.json';
import { getContent, Locale, PortfolioContent } from '../content';

type Strings = typeof strings.es;
export type StringKey = {
    [K in keyof Strings]: Strings[K] extends string ? K : never;
}[keyof Strings];

// The 3D site that shows this one on its monitor. Only these origins may set
// the language through postMessage.
const PARENT_ORIGINS = ['https://otromigala.github.io'];
const isTrustedParent = (origin: string) =>
    PARENT_ORIGINS.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin);

const isLocale = (value: unknown): value is Locale => value === 'es' || value === 'en';

function initialLocale(): Locale {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isLocale(fromUrl)) return fromUrl;
    try {
        const stored = localStorage.getItem('lang');
        if (isLocale(stored)) return stored;
    } catch (e) {
        // Storage can be blocked inside a cross-origin iframe.
    }
    return 'es';
}

interface LocaleValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: StringKey, vars?: Record<string, string | number>) => string;
    months: string[];
    content: PortfolioContent;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export const LocaleProvider: React.FC = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    // Language chosen in the taskbar: remember it, and tell the 3D site so the
    // page around the monitor switches too.
    const setLocale = useCallback((next: Locale) => {
        setLocaleState(next);
        try {
            localStorage.setItem('lang', next);
        } catch (e) {
            // ignore
        }
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'setLang', lang: next }, '*');
        }
    }, []);

    // Language chosen in the 3D site.
    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.source !== window.parent || !isTrustedParent(event.origin)) return;
            if (event.data && event.data.type === 'setLang' && isLocale(event.data.lang)) {
                setLocaleState(event.data.lang);
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    const t = useCallback(
        (key: StringKey, vars?: Record<string, string | number>) => {
            let value = strings[locale][key] as string;
            if (vars) {
                for (const [name, v] of Object.entries(vars)) value = value.split(`{${name}}`).join(String(v));
            }
            return value;
        },
        [locale]
    );

    return (
        <LocaleContext.Provider
            value={{ locale, setLocale, t, months: strings[locale]['date.months'], content: getContent(locale) }}
        >
            {children}
        </LocaleContext.Provider>
    );
};

export function useLocale(): LocaleValue {
    const value = useContext(LocaleContext);
    if (!value) throw new Error('useLocale must be used inside LocaleProvider');
    return value;
}
