import LinkedListNode from './LinkedListNode';
export default class LinkedList<T> {
    public firstN: LinkedListNode<T> | null = null
    private lastN: LinkedListNode<T> | null = null
    private length: number = 0;

    constructor() { }

    public add(item: T, index?: number): boolean {
        index ? index : index = this.length
        if (index < 0 || index > this.length || !item) return false;
        const node = this.create(item);
        if(this.length === 0 || this.lastN === null) {
            this.firstN = node
            this.lastN = node
        } else if(index === this.length) {
            this.lastN.next = node
            this.lastN = node
        } else if(index === 0) {
            node.next = this.firstN
            this.firstN = node
        } else {
            const prev = this.nodeAtIndex(index - 1);
            if(prev == null) return false
            else {
                node.next = prev.next
                prev.next = node
            }
        }
        this.length++;
        return true;
        
    }

    public first(): T | undefined {
        return this.firstN ? this.firstN.element : undefined
    }

    public last(): T | undefined {
        return this.lastN ? this.lastN.element : undefined
    }

    public atIndex(index: number): T | undefined {
        const node = this.nodeAtIndex(index);
        return node ? node.element : undefined
    }

    public indexOf(item: T): number | undefined {
        if(!item) return undefined;
        let node = this.firstN
        let index = 0;
        while(node !== null) {
            if(node.element === item) return index;
            index++;
            node = node.next;
        }
        return undefined;
    }

    public contains(item: T): boolean {
        const index = this.indexOf(item);
        return index ? true : false;
    }

    public remove(item: T): boolean {
        if(this.length < 1 || !item) return false;
        let prev: LinkedListNode<T> | null = null;
        let curr: LinkedListNode<T> | null = this.firstN;

        while(curr !== null) {
            if(curr.element === item) {
                if(prev == null) {
                    this.firstN = curr.next;
                    if(curr === this.lastN) this.lastN = null;
                } else if(curr === this.lastN) {
                    this.lastN = prev;
                    prev.next = curr.next;
                    curr.next = null;
                } else {
                    prev.next = curr.next;
                    curr.next = null;
                }
                this.length--;
                return true;
            }
            prev = curr;
            curr = curr.next;
        }
        return false;
    }

    public clear(): void {
        this.firstN = null;
        this.lastN = null;
        this.length = 0;
    }

    protected nodeAtIndex(index: number): LinkedListNode<T> | null {
        if(index < 0 || index >= this.length) return null;
        else if(index === (this.length - 1)) return this.lastN; 
        
        let node = this.firstN;
        for(let i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    }

    protected create(item: T): LinkedListNode<T> {
        return {
            element: item,
            next: null
        };
    }

    public get size(): number {
        return this.length;
    }
    public get isEmpty(): boolean {
        return this.length <= 0;
    }

    public toArray(): T[] {
        const array: T[] = [];
        let curr: LinkedListNode<T> | null = this.firstN;
        while(curr !== null) {
            array.push(curr.element);
            curr = curr.next;
        }
        return array;
    }
    public toString(): string {
        return `[${this.toArray()}]`;
    }

    public equals(list: any): boolean {
        if(!(list instanceof LinkedList)) return false;
        if(this.size !== list.size) return false;
        return this.compare(this.firstN, list.firstN);
    }

    private compare(n1: LinkedListNode<T> | null, n2: LinkedListNode<T> | null): boolean {
        while(n1 !== null && n2 !== null) {
            if(n1.element !== n2.element) return false;
            n1 = n1.next;
            n2 = n2.next;
        }
        return true;
    }
}