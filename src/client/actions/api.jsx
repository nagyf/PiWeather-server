import _ from 'lodash';
import config from '../core/config';

/**
 * A helper class to handle API urls
 */
class Api {

    /**
     * Cleans up the URL by removing the whitespaces around it, and adding a '/' to the beginning of the url if needed.
     * @param url the URL to clean up
     * @returns {string|String|*|SchemaType} the new URL
     */
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
