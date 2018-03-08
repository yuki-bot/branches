"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Container for bucket-specific information, such as when a bucket resets and
 * how many tickets are remaining in the bucket.
 *
 * @class
 */
class Bucket {
    constructor() {
        /**
         * The total number of tickets that are allowed to be taken.
         */
        this.limit = 0;
        /**
         * The number of tickets remaining.
         */
        this.remaining = 1;
        /**
         * The unix timestamp - in seconds - of when the bucket resets.
         */
        this.reset = 0;
    }
    /**
     * Takes a ticket from the bucket, sleeping if necessary if the number of
     * remaining tickets is 0.
     *
     * @public
     * @method
     */
    async take() {
        for (;;) {
            // If the remaining is greater than zero, decrement it, and let the
            // ticket retrieval finish.
            if (this.remaining > 0) {
                this.remaining -= 1;
                return;
            }
            const now = new Date().getTime();
            // If the reset was in the past, just set it back to the limit,
            // minus one (for this request).
            if (now > this.reset) {
                this.remaining = this.limit - 1;
                return;
            }
            // Since the `reset` hasn't been reached yet in time, and
            // `remaining` is zero, we need to queue the ticket retrieval.
            await new Promise((resolve) => setTimeout(resolve, this.reset - now));
            // Finally, set `remaining` back to `limit`, but only if it's still
            // 0.
            //
            // This avoids other queued ticket retrievals from also setting it
            // back to 0.
            if (this.remaining === 0) {
                this.remaining = this.limit;
            }
            // Re-loop so that the ticket retrieval can start back from the
            // beginning. If _a lot_ of requests were queued, this will re-queue
            // the later requests.
        }
    }
}
exports.default = Bucket;
//# sourceMappingURL=Bucket.js.map