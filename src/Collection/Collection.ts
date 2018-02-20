export default class Collection<T> extends Map {
    constructor() {
        super();
    }
    public find(f: Function): T | undefined {
        for(let i of this.values()) {
            if(f(i)) return i;
        }
        return undefined;
    }
    public filter(f: Function): T[] | undefined {
        const a = [];
        for(let i of this.values()) {
            if(f(i)) a.push(i);
        }
        return a;
    }
    public map(f: Function): T[] | undefined {
        const a = [];
        for(let i of this.values()) {
            a.push(f(i));  
        }
        return a;
    }
}