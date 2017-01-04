import _ from 'lodash';
import config from '../core/config';

class Api {
    cleanup(url) {
        let newUrl = _.trim(url);
        if(!_.startsWith(newUrl, '/')){
            newUrl = '/' + newUrl;
        }

        return newUrl;
    }

    getUrl(url) {
        if(_.isString(url)) {
            return config.API_BASE_URL + this.cleanup(url);
        } else {
            return config.API_BASE_URL;
        }
    }
}

export default new Api();
