export default interface LinkedListNode<T> {
    element: T;
    next: LinkedListNode<T> | null;
}
