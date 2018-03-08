"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("../LinkedList/LinkedList");
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
//# sourceMappingURL=Queue.js.map