/**
 * Container for bucket-specific information, such as when a bucket resets and
 * how many tickets are remaining in the bucket.
 *
 * @class
 */
export default class Bucket {
    /**
     * The total number of tickets that are allowed to be taken.
     */
    limit: number;
    /**
     * The number of tickets remaining.
     */
    remaining: number;
    /**
     * The unix timestamp - in seconds - of when the bucket resets.
     */
    reset: number;
    /**
     * Takes a ticket from the bucket, sleeping if necessary if the number of
     * remaining tickets is 0.
     *
     * @public
     * @method
     */
    take(): Promise<void>;
}
