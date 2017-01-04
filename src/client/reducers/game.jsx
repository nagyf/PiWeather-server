import _ from 'lodash';
import {
    FETCH_GAMES_SUCCESS,
    NEW_GAME,
    NEW_GAME_PLAYERS,
    NEW_GAME_TYPE,
    NEW_GAME_STEP,
    FETCH_GAME_SUCCESS
} from '../actions/game';

const initialState = {
    games: [],
    newGame: {
        step: 0,
        gameType: 101,
        players: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAMES_SUCCESS: {
            return Object.assign({}, state, {games: action.payload.games});
        }
        case FETCH_GAME_SUCCESS: {
            return Object.assign({}, state, {games: [action.payload.game]});
        }
        case NEW_GAME: {
            return Object.assign({}, state, {newGame: Object.assign({}, initialState.newGame)});
        }
        case NEW_GAME_TYPE: {
            const newState = _.cloneDeep(state);
            newState.newGame.gameType = action.payload.type;
            return newState;
        }
        case NEW_GAME_PLAYERS: {
            const newState = _.cloneDeep(state);
            newState.newGame.players = action.payload.players.slice();
            return newState;
        }
        case NEW_GAME_STEP: {
            const newState = _.cloneDeep(state);
            newState.newGame.step = action.payload.step;
            return newState;
        }
    }
    return state;
};
