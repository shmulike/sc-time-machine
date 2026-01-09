import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'he';

export type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        'app.title': 'Time Machine',
        'app.subtitle': 'How Long Is ‘Long’?',
        'step.label': 'Choose Time Step:',
        'slider.label': 'Go back in steps of',
        'slider.value': 'Going back {value} steps',
        'target.label': 'Target Time:',
        'target.now': 'Now',
        'focus.label': 'Focus Area:',
        'loading.title': 'Traveling through time...',
        'empty.title': 'No events found.',
        'empty.hint': 'Try adjusting your time machine slightly!',
        'read.more': 'Read on Wikipedia →',
        'theme.dark': '🌙 Dark Mode',
        'theme.light': '☀️ Light Mode',
        'lang.en': '🇺🇸 English',
        'lang.he': '🇮🇱 Hebrew',
        'modal.summary': 'Summary',
        'modal.context': 'Historical Context',
        'modal.impact': 'Why it Matters',
        'modal.close': 'Close',
    },
    he: {
        'app.title': 'מכונת הזמן',
        'app.subtitle': 'כמה זמן זה ״מזמן״?',
        'step.label': 'בחר קפיצת זמן:',
        'slider.label': 'חזור אחורה בקפיצות של',
        'slider.value': 'חוזר {value} צעדים אחורה',
        'target.label': 'זמן יעד:',
        'target.now': 'עכשיו',
        'focus.label': 'תחום עניין:',
        'loading.title': 'נוסע בזמן...',
        'empty.title': 'לא נמצאו אירועים.',
        'empty.hint': 'נסה לכוון את מכונת הזמן מעט!',
        'read.more': 'קרא עוד בוויקיפדיה ←',
        'theme.dark': '🌙 מצב כהה',
        'theme.light': '☀️ מצב בהיר',
        'lang.en': '🇺🇸 אנגלית',
        'lang.he': '🇮🇱 עברית',
        'modal.summary': 'תקציר',
        'modal.context': 'הקשר היסטורי',
        'modal.impact': 'למה זה חשוב',
        'modal.close': 'סגור',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Update HTML dir attribute for RTL support
    useEffect(() => {
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = (key: string, params?: Record<string, string | number>): string => {
        let text = translations[language][key] || key;
        if (params) {
            Object.entries(params).forEach(([paramKey, paramValue]) => {
                text = text.replace(`{${paramKey}}`, String(paramValue));
            });
        }
        return text;
    };

    const isRTL = language === 'he';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
