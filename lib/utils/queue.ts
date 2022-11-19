// circular queue data structure.
export class Queue<QueueType> {
    readonly queue: QueueType[]

    private length: number // max number of items that can be in the queue

    private front = 0 // front of the queue

    private tail = 0 // end of the queue

    // max length is defined on creation and array of that limit
    constructor(setLength: number) {
        this.length = setLength
        this.queue = new Array<QueueType>(setLength)
    }

    enQueue = (newItem: QueueType): void => {
        if (this.tail === this.length || this.front - 1 === this.tail)
            throw new Error('Queue length exceeded')
        this.queue[this.tail] = newItem // sets the newItem to be at the end of the queue.
        // increments the end of the tail accordingly
        this.tail = this.tail === this.length - 1 ? 0 : this.tail + 1
    }

    deQueue = (): void => {
        if (this.tail === this.front) throw new Error('Queue is empty')
        // adjusts the front of the tail
        // does not overwrite data to be undefined as this is expensive.
        this.front = this.front === this.length - 1 ? 0 : this.front + 1
    }
}
