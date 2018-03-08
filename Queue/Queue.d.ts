import LinkedList from '../LinkedList/LinkedList';
export default class Queue<T> extends LinkedList<T> {
    enqueue(item: T): boolean;
    peek(): T | undefined;
    dequeue(): T | undefined;
}
