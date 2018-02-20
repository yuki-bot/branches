define("Bucket/Bucket", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bucket {
        constructor() {
            this.limit = 0;
            this.remaining = 1;
            this.reset = 0;
        }
        async take() {
            for (;;) {
                if (this.remaining > 0) {
                    this.remaining -= 1;
                    return;
                }
                const now = new Date().getTime();
                if (now > this.reset) {
                    this.remaining = this.limit - 1;
                    return;
                }
                await new Promise((resolve) => setTimeout(resolve, this.reset - now));
                if (this.remaining === 0) {
                    this.remaining = this.limit;
                }
            }
        }
    }
    exports.default = Bucket;
});
define("Collection/Collection", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Collection extends Map {
        constructor() {
            super();
        }
        find(f) {
            for (let i of this.values()) {
                if (f(i))
                    return i;
            }
            return undefined;
        }
        filter(f) {
            const a = [];
            for (let i of this.values()) {
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
});
define("LinkedList/LinkedListNode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("LinkedList/LinkedList", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LinkedList {
        constructor() {
            this.firstN = null;
            this.lastN = null;
            this.length = 0;
        }
        add(item, index) {
            index ? index : index = this.length;
            if (index < 0 || index > this.length || !item)
                return false;
            const node = this.create(item);
            if (this.length === 0 || this.lastN === null) {
                this.firstN = node;
                this.lastN = node;
            }
            else if (index === this.length) {
                this.lastN.next = node;
                this.lastN = node;
            }
            else if (index === 0) {
                node.next = this.firstN;
                this.firstN = node;
            }
            else {
                const prev = this.nodeAtIndex(index - 1);
                if (prev == null)
                    return false;
                else {
                    node.next = prev.next;
                    prev.next = node;
                }
            }
            this.length++;
            return true;
        }
        first() {
            return this.firstN ? this.firstN.element : undefined;
        }
        last() {
            return this.lastN ? this.lastN.element : undefined;
        }
        atIndex(index) {
            const node = this.nodeAtIndex(index);
            return node ? node.element : undefined;
        }
        indexOf(item) {
            if (!item)
                return undefined;
            let node = this.firstN;
            let index = 0;
            while (node !== null) {
                if (node.element === item)
                    return index;
                index++;
                node = node.next;
            }
            return undefined;
        }
        contains(item) {
            const index = this.indexOf(item);
            return index ? true : false;
        }
        remove(item) {
            if (this.length < 1 || !item)
                return false;
            let prev = null;
            let curr = this.firstN;
            while (curr !== null) {
                if (curr.element === item) {
                    if (prev == null) {
                        this.firstN = curr.next;
                        if (curr === this.lastN)
                            this.lastN = null;
                    }
                    else if (curr === this.lastN) {
                        this.lastN = prev;
                        prev.next = curr.next;
                        curr.next = null;
                    }
                    else {
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
        clear() {
            this.firstN = null;
            this.lastN = null;
            this.length = 0;
        }
        nodeAtIndex(index) {
            if (index < 0 || index >= this.length)
                return null;
            else if (index === (this.length - 1))
                return this.lastN;
            let node = this.firstN;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        create(item) {
            return {
                element: item,
                next: null
            };
        }
        get size() {
            return this.length;
        }
        get isEmpty() {
            return this.length <= 0;
        }
        toArray() {
            const array = [];
            let curr = this.firstN;
            while (curr !== null) {
                array.push(curr.element);
                curr = curr.next;
            }
            return array;
        }
        toString() {
            return `[${this.toArray()}]`;
        }
        equals(list) {
            if (!(list instanceof LinkedList))
                return false;
            if (this.size !== list.size)
                return false;
            return this.compare(this.firstN, list.firstN);
        }
        compare(n1, n2) {
            while (n1 !== null && n2 !== null) {
                if (n1.element !== n2.element)
                    return false;
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        }
    }
    exports.default = LinkedList;
});
define("Queue/Queue", ["require", "exports", "LinkedList/LinkedList"], function (require, exports, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Queue extends LinkedList_1.default {
        enqueue(item) { return this.add(item); }
        peek() {
            return this.size !== 0 ? this.first() : undefined;
        }
        dequeue() {
            if (this.size !== 0) {
                const element = this.first();
                if (element == null)
                    return undefined;
                this.remove(element);
                return element;
            }
            return undefined;
        }
    }
    exports.default = Queue;
});
define("index", ["require", "exports", "Bucket/Bucket", "Collection/Collection", "LinkedList/LinkedList", "Queue/Queue"], function (require, exports, Bucket_1, Collection_1, LinkedList_2, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        LinkedList: LinkedList_2.default,
        Queue: Queue_1.default,
        Collection: Collection_1.default,
        Bucket: Bucket_1.default,
    };
});
