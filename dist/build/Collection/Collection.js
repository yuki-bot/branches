"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    constructor() {
        super();
    }
    find(f) {
        for (let i of this.values()) {
            // tslint:disable-next-line:curly
            if (f(i))
                return i;
        }
        return undefined;
    }
    filter(f) {
        const a = [];
        for (let i of this.values()) {
            // tslint:disable-next-line:curly
            if (f(i))
                a.push(i);
        }
        return a;
    }
    map(f) {
        const a = [];
        for (let i of this.values()) {
            a.push(f(i));
        }
        return a;
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map