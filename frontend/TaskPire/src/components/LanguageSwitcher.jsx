import React from 'react';
import { useTranslation } from 'react-i18next';
import {IR, US} from "country-flag-icons/react/1x1";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.body.dir = lng === 'fa' ? 'rtl' : 'ltr';
        localStorage.setItem('appLanguage', lng);
    };


    React.useEffect(() => {
        const savedLang = localStorage.getItem('appLanguage') || 'en';
        i18n.changeLanguage(savedLang);
        document.body.dir = savedLang === 'fa' ? 'rtl' : 'ltr';
    }, [i18n]);

    return (
        <div style={{ display: 'flex', gap: '1px' }}>
            <button
                onClick={() => changeLanguage('en')}
                style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '10px' }}
                title="English"
            >
                <US title="United States" className="w-10 h-5 rounded-3xl"/> English
            </button>

            <button
                onClick={() => changeLanguage('fa')}
                style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '10px' }}
                title="فارسی"
            >
                <IR title="Iran" className="w-10 h-5 rounded-3xl"/> فارسی
            </button>
        </div>
    );
};

export default LanguageSwitcher;
