import _ from 'lodash';

/**
 * Group the array of elements into N sized groups
 * @param is the array of items
 * @param n the size of the groups
 * @return {Array} an array of arrays, containing the groups
 */
export function groupByN(is, n) {
    if (!_.isArray(is) || !_.isNumber(n) || n <= 0 || _.isEmpty(is)) {
        return [];
    }

    const result = [];
    let items = [...is];
    while (!_.isEmpty(items)) {
        result.push(_.take(items, n));
        items = _.drop(items, n);
    }
    return result;
}
