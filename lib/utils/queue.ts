// circular queue data structure.
export class Queue<QueueType> {
    readonly queue: Array<QueueType | undefined>

    private length: number // max number of items that can be in the queue

    private head = 0 // head of the queue

    private tail = 0 // end of the queue

    // max length is defined on creation and array of that limit
    constructor(setLength: number) {
        this.length = setLength
        this.queue = new Array<QueueType | undefined>(setLength)
    }

    enQueue = (newItem: QueueType): void => {
        if (this.tail === this.length || this.head - 1 === this.tail)
            throw new Error('Queue length exceeded')
        this.queue[this.tail] = newItem // sets the newItem to be at the end of the queue.
        // increments the end of the tail accordingly
        this.tail = this.tail === this.length - 1 ? 0 : this.tail + 1
    }

    deQueue = (): void => {
        if (this.tail === this.head) throw new Error('Queue is empty')
        // adjusts the head of the tail
        // does not overwrite data to be undefined as this is expensive.
        this.queue[this.head] = undefined
        this.head = this.head === this.length - 1 ? 0 : this.head + 1
    }

    deQueueSpecific = (index: number): void => {
        // removes specific element from queue
        // does not adjust head or tail.
        this.queue[index] = undefined
    }
}
