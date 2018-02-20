declare module "Bucket/Bucket" {
    export default class Bucket {
        limit: number;
        remaining: number;
        reset: number;
        take(): Promise<void>;
    }
}
declare module "Collection/Collection" {
    export default class Collection<T> extends Map {
        constructor();
        find(f: Function): T | undefined;
        filter(f: Function): T[] | undefined;
        map(f: Function): T[] | undefined;
    }
}
declare module "LinkedList/LinkedListNode" {
    export default interface LinkedListNode<T> {
        element: T;
        next: LinkedListNode<T> | null;
    }
}
declare module "LinkedList/LinkedList" {
    import LinkedListNode from "LinkedList/LinkedListNode";
    export default class LinkedList<T> {
        firstN: LinkedListNode<T> | null;
        private lastN;
        private length;
        constructor();
        add(item: T, index?: number): boolean;
        first(): T | undefined;
        last(): T | undefined;
        atIndex(index: number): T | undefined;
        indexOf(item: T): number | undefined;
        contains(item: T): boolean;
        remove(item: T): boolean;
        clear(): void;
        protected nodeAtIndex(index: number): LinkedListNode<T> | null;
        protected create(item: T): LinkedListNode<T>;
        readonly size: number;
        readonly isEmpty: boolean;
        toArray(): T[];
        toString(): string;
        equals(list: any): boolean;
        private compare(n1, n2);
    }
}
declare module "Queue/Queue" {
    import LinkedList from "LinkedList/LinkedList";
    export default class Queue<T> extends LinkedList<T> {
        enqueue(item: T): boolean;
        peek(): T | undefined;
        dequeue(): T | undefined;
    }
}
declare module "index" {
    import Bucket from "Bucket/Bucket";
    import Collection from "Collection/Collection";
    import LinkedList from "LinkedList/LinkedList";
    import Queue from "Queue/Queue";
    const _default: {
        LinkedList: typeof LinkedList;
        Queue: typeof Queue;
        Collection: typeof Collection;
        Bucket: typeof Bucket;
    };
    export default _default;
}
