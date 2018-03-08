import LinkedListNode from "./LinkedListNode";
export default class LinkedList<T> {
    firstN: LinkedListNode<T> | null;
    private lastN;
    private length;
    add(item: T, index?: number): boolean;
    first(): T | undefined;
    last(): T | undefined;
    atIndex(index: number): T | undefined;
    indexOf(item: T): number | undefined;
    contains(item: T): boolean;
    remove(item: T): boolean;
    clear(): void;
    toArray(): T[];
    toString(): string;
    equals(list: any): boolean;
    protected nodeAtIndex(index: number): LinkedListNode<T> | null;
    protected create(item: T): LinkedListNode<T>;
    readonly size: number;
    readonly isEmpty: boolean;
    private compare(n1, n2);
}
