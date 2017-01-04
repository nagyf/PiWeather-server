import axios from 'axios';
import Api from './api';

export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_ERROR = 'FETCH_GAMES_ERROR';

export const FETCH_GAME = 'FETCH_GAME';
export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';

export const NEW_GAME = 'NEW_GAME';
export const NEW_GAME_TYPE = 'NEW_GAME_TYPE';
export const NEW_GAME_PLAYERS = 'NEW_GAME_PLAYERS';
export const NEW_GAME_STEP = 'NEW_GAME_STEP';

export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_ERROR = 'CREATE_GAME_ERROR';

export function fetchGames() {
    return dispatch => {
        dispatch({type: FETCH_GAMES});

        return axios.get(Api.getUrl('games/'))
            .then(res => dispatch(fetchGamesSuccess(res.data)))
            .catch(error => dispatch(fetchGamesError(error.status, error)))
    };
}

export function fetchGamesSuccess(games) {
    return {
        type: FETCH_GAMES_SUCCESS,
        payload: {
            games: games
        }
    }
}

export function fetchGamesError(status, error) {
    return {
        type: FETCH_GAMES_ERROR,
        payload: {
            status: status,
            error: error
        }
    }
}

export function fetchGame(id) {
    return dispatch => {
        dispatch({type: FETCH_GAME});

        return axios.get(Api.getUrl(`games/${id}`))
            .then(res => dispatch(fetchGameSuccess(res.data)))
            .catch(error => dispatch(fetchGameError(error.status, error)))
    };
}

export function fetchGameSuccess(game) {
    return {
        type: FETCH_GAME_SUCCESS,
        payload: {
            game: game
        }
    }
}

export function fetchGameError(status, error) {
    return {
        type: FETCH_GAME_ERROR,
        payload: {
            status: status,
            error: error
        }
    }
}

export function newGame() {
    return {
        type: NEW_GAME
    };
}

export function newGameType(type) {
    return {
        type: NEW_GAME_TYPE,
        payload: {
            type
        }
    };
}

export function newGamePlayers(players) {
    return {
        type: NEW_GAME_PLAYERS,
        payload: {
            players
        }
    };
}

export function newGameStep(step) {
    return {
        type: NEW_GAME_STEP,
        payload: {
            step
        }
    };
}

export function createGame(game) {
    return dispatch => {
        dispatch({type: CREATE_GAME});

        return axios.post(Api.getUrl('games/'), game)
            .then(result => dispatch(createGameSuccess(result.data)))
            .catch(error => dispatch(createGameError(error.status, error)));
    };
}

export function createGameSuccess(game) {
    return {
        type: CREATE_GAME_SUCCESS,
        payload: {
            game: game
        }
    };
}

export function createGameError(status, error) {
    return {
        type: CREATE_GAME_ERROR,
        payload: {
            status: status,
            error: error
        }
    };
}
