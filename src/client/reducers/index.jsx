import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users from './user';
import confirm from './confirm';
import auth from './auth';
import frame from './frame';
import menu from './menu';
import i18n from './translations';
import snack from './snack';

export default combineReducers({
    routing: routerReducer,
    loadingBar: loadingBarReducer,
    i18n,
    users,
    confirm,
    auth,
    frame,
    menu,
    snack
});
