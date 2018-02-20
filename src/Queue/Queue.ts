import LinkedList from '../LinkedList/LinkedList';

class Queue<T> extends LinkedList<T> {

    public enqueue(item: T): boolean { return this.add(item) }
    
    public peek(): T | undefined {
        return this.size !== 0 ? this.first() : undefined
    }

    public dequeue(): T | undefined {
        if(this.size !== 0) {
            const element = this.first();
            this.remove(element);
            return element;
        }
        return undefined;
    }
}