import { SET_LOCALE, SET_TRANSLATIONS } from '../actions/translations';
import translations from '../translations';

const initialState = {
    locale: 'en',
    translations
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALE: {
            return Object.assign({}, state, {locale: action.payload.locale});
        }
        case SET_TRANSLATIONS: {
            return Object.assign({}, state, {translations: action.payload.translations});
        }
    }
    return state;
};
