import Api from './api';
import config from '../core/config';

describe('actions.Api', () => {
    describe('cleanup', function () {
        it('must exist', function () {
            expect(Api.cleanup).toBeDefined();
        });

        it('must add a / at the start of the url if needed', function () {
            const url = 'foo/bar';
            expect(Api.cleanup(url)).toBe('/' + url);
        });

        it('must trim the url if needed', function () {
            const url = '   foo/bar   ';
            expect(Api.cleanup(url)).toBe('/foo/bar');
        });

        it('must leave the url unmodified if everything is ok', function () {
            const url = '/foo/bar';
            expect(Api.cleanup(url)).toBe(url);
        });
    });

    describe('getUrl', function () {
        it('must exist', function () {
            expect(Api.getUrl).toBeDefined();
        });

        it('must prepend the URL with the base URL', function () {
            const url = '/foo/bar';
            expect(Api.getUrl(url)).toBe(config.API_BASE_URL + url);
        });

        it('must clean up the URL', function () {
            const url = '   foo/bar   ';
            expect(Api.getUrl(url)).toBe(config.API_BASE_URL + '/foo/bar');
        });

        it('must return the base URL if something other than a string is specified', function () {
            expect(Api.getUrl(undefined)).toBe(config.API_BASE_URL);
            expect(Api.getUrl(null)).toBe(config.API_BASE_URL);
            expect(Api.getUrl(123)).toBe(config.API_BASE_URL);
        });
    });
});
