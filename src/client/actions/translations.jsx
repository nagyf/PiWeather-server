export const SET_LOCALE = 'SET_LOCALE';
export const SET_TRANSLATIONS = 'SET_TRANSLATIONS';

export function setLocale(locale) {
    return {
        type: SET_LOCALE,
        payload: {
            locale
        }
    };
}

export function setTranslations(translations) {
    return {
        type: SET_TRANSLATIONS,
        payload: {
            translations
        }
    };
}
