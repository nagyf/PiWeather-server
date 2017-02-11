import {SET_LOCALE, SET_TRANSLATIONS, setLocale, setTranslations} from './translations';

describe('actions.translations', function () {
    describe('setLocale', function () {
        it('must be defined', function () {
            expect(setLocale).toBeDefined();
        });

        it('action type must equal to SET_LOCALE', function () {
            expect(setLocale('hu').type).toEqual(SET_LOCALE);
        });

        it('action payload must contain the locale', function () {
            const locale = 'hu';
            expect(setLocale(locale).payload).toEqual({
                locale
            });
        });
    });

    describe('setTranslations', function () {
        it('must be defined', function () {
            expect(setTranslations).toBeDefined();
        });

        it('action type must equal to SET_TRANSLATIONS', function () {
            expect(setTranslations([]).type).toEqual(SET_TRANSLATIONS);
        });

        it('action payload must contain the translations', function () {
            const translations = ['hu', 'en'];
            expect(setTranslations(translations).payload).toEqual({
                translations
            });
        });
    });
});
