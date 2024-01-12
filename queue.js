class Queue {
  #database;

  constructor() {
    this.#database = [];
  }

  enqueue(value) {
    this.#database.push(value);
  }

  dequeue() {
    this.#database.shift();
  }

  toArray() {
    return this.#database;
  }

  front() {
    return this.#database[0] || null;
  }

  back() {
    return this.#database[this.#database.length - 1];
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);
queue.enqueue(5);
queue.enqueue(6);
queue.dequeue();
queue.dequeue();
console.log(queue.toArray());
console.log(queue.front());
console.log(queue.back());
