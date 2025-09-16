import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fa from './locales/fa.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            fa: { translation: fa }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
        react: {
            useSuspense: false,
        },
    });
    
document.body.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';

export default i18n;
