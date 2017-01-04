import config from '../../core/config';

class PersistentStorage {
    constructor() {
        this.localStorage = null;

        if (typeof Storage !== 'undefined') {
            this.localStorage = localStorage;
        }
    }

    getJwtToken() {
        if (this.localStorage) {
            const token = this.localStorage.getItem(config.JWT_TOKEN);
            return token !== 'null' ? token : null;
        } else {
            return null;
        }
    }

    setJwtToken(token) {
        if (this.localStorage) {
            this.localStorage.setItem(config.JWT_TOKEN, token);
        }
    }

    getCurrentUserId() {
        if (this.localStorage) {
            const id = this.localStorage.getItem(config.CURRENT_USER_ID);
            return id !== 'null' ? id : null;
        } else {
            return null;
        }
    }

    setCurrentUserId(id) {
        if (this.localStorage) {
            this.localStorage.setItem(config.CURRENT_USER_ID, id);
        }
    }
}

export default (new PersistentStorage());
