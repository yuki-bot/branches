export default class Collection<T> extends Map {
    constructor();
    find(f: Function): T | undefined;
    filter(f: Function): T[] | undefined;
    map(f: Function): T[] | undefined;
}
