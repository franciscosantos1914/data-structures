class Node {
  constructor(prev, data, next) {
    this.prev = prev;
    this.data = data;
    this.next = next;
  }
}

class DoublyLinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  prepend(data) {
    const newNode = new Node(null, data, this.#head);
    if (this.#head) {
      this.#head.prev = newNode;
    }
    this.#head = newNode;
    this.#tail = this.#tail || newNode;
  }

  append(data) {
    const newNode = new Node(this.#tail, data, null);
    if (this.#tail) {
      this.#tail.next = newNode;
    }
    this.#tail = newNode;
    this.#head = this.#head || newNode;
  }

  find(item) {
    let currentNode = this.#tail;
    while (currentNode) {
      if (currentNode.data == item) {
        return currentNode;
      }
      currentNode = currentNode.prev;
    }
    return null;
  }

  insert(newData, item) {
    const nextElement = this.find(item);
    if (!nextElement) return;
    const newNode = new Node(nextElement?.prev, newData, nextElement);
    nextElement.prev.next = newNode;
    nextElement.prev = newNode;
  }

  remove(item) {
    const element = this.find(item);
    if (!element) return;
    if (element.prev) element.prev.next = element.next;
    if (element.next) element.next.prev = element.prev;
    element.next = null
    element.prev = null
  }

  display() {
    let currentNode = this.#head;
    while (currentNode) {
      console.log("display: ", currentNode.data);
      currentNode = currentNode.next;
    }
  }
}

const list = new DoublyLinkedList();
list.prepend(2);
list.prepend(3);
list.append(4);
list.append(5);
list.insert(8, 4);
list.remove(5);
list.display();
