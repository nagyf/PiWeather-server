import deepFreeze from 'deep-freeze';
import {setLocale, setTranslations} from '../actions/translations';
import translations from '../translations';
import reducer from './translations';

describe('reducers.translations', function () {
    it('should return the initial state', function () {
        expect(reducer(undefined, {})).toEqual({
            locale: 'en',
            translations
        });
    });

    it('should handle setLocale', function () {
        const state = {
            locale: 'en',
            translations
        };

        deepFreeze(state);

        expect(reducer(state, setLocale('hu'))).toEqual({
            locale: 'hu',
            translations
        });
    });

    it('should handle setTranslations', function () {
        const state = {
            locale: 'en',
            translations
        };

        deepFreeze(state);

        const newTranslations = {
            foo: 'bar'
        };

        expect(reducer(state, setTranslations(newTranslations))).toEqual({
            locale: 'en',
            translations: newTranslations
        });
    });
});
