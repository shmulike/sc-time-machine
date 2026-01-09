import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { TimeStep } from '../types';

export type Language = 'en' | 'he';

export type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        'app.branding': 'from shmulik Creations',
        'app.title': 'Time Machine',
        'app.subtitle': 'How Long Is ‘Long’?',
        'app.footer': '© 2026 shmulik Creations. All rights reserved.',
        'step.label': 'Choose Time Step:',
        'slider.label': 'Go back in steps of',
        'slider.value': 'Going back {value} {unit}',
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
        'more.events': 'Show More Events',
        'tts.listen': '🔊 Listen',
        'tts.stop': '⏸ Stop',
        'voice.select': '🎤 Voice',
    },
    he: {
        'app.branding': 'מבית היוצר של shmulik Creations',
        'app.title': 'מכונת הזמן',
        'app.subtitle': 'כמה זמן זה ״מזמן״?',
        'app.footer': '© 2026 shmulik Creations. כל הזכויות שמורות.',
        'step.label': 'בחר קפיצת זמן:',
        'slider.label': 'חזור אחורה בקפיצות של',
        'slider.value': 'חוזר {value} {unit} אחורה',
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
        'more.events': 'הצג אירועים נוספים',
        'tts.listen': '🔊 האזן',
        'tts.stop': '⏸ עצור',
        'voice.select': '🎤 קול',
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: Record<string, string | number>) => string;
    isRTL: boolean;
    getUnitName: (step: TimeStep, value: number) => string;
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

    const getUnitName = (step: TimeStep, value: number): string => {
        const isEnglish = language === 'en';
        const multiple = value !== 1;

        switch (step) {
            case '1 minute':
                if (isEnglish) return multiple ? 'minutes' : 'minute';
                return 'דקות';
            case '1 year':
            case '10 years':
            case '100 years':
            case '1000 years':
                if (isEnglish) return multiple ? 'years' : 'year';
                return 'שנים';
            case '1 million years':
                if (isEnglish) return multiple ? 'million years' : 'million year';
                return 'מיליון שנה';
            default:
                return isEnglish ? 'steps' : 'צעדים';
        }
    };

    const isRTL = language === 'he';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, getUnitName }}>
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
