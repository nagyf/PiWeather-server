import _ from 'lodash';
import reducer from './menu';

describe('reducers.menu', function () {
    it('should return the initial state', function () {
        const menu = reducer(undefined, {});

        expect(menu).toBeDefined();

        const urls = _.map(menu, 'url');

        expect(urls).toContain('/');
        expect(urls).toContain('/users');
        expect(urls).toContain('/me');
        expect(urls).toContain('/logout');
    });
});
