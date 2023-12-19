class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  prepend(newValue) {
    const newNode = new Node(newValue, this.#head);
    this.#head = newNode;
    this.#tail = this.#tail || newNode;
  }

  append(newValue) {
    const newNode = new Node(newValue, null);
    if (!this.#head) {
      this.#head = this.#tail = newNode;
    } else {
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
  }

  find(item) {
    let current = this.#head;
    while (current) {
      if (current.value === item) {
        return current;
      }
      current = current.next;
    }
    return -1;
  }

  findPrevious(item) {
    let current = this.#head;
    while (current) {
      if (current.next.value === item) {
        return current;
      }
      current = current.next;
    }
    return -1;
  }

  insert(newValue, item) {
    let element = this.find(item);
    if (!~element) {
      this.append(newValue);
      return;
    }
    const newNode = new Node(newValue, element.next);
    element.next = newNode;
  }

  display() {
    let current = this.#head;
    while (current) {
      console.log("display: ", current.value);
      current = current.next;
    }
  }

  remove(item) {
    let element = this.find(item);
    let previousElement = this.findPrevious(item);
    if (!~element) return;
    if (!~previousElement) {
      this.#head = this.#head.next;
      return;
    }
    previousElement.next = element.next;
  }
}

const list = new SinglyLinkedList();

list.prepend("A");
list.prepend("Z");
list.prepend("Y");
list.prepend("X");
list.prepend("U");
list.append("B");
list.append("K");
list.append("L");
list.append("O");
list.append("P");
list.insert("C", "A");
list.insert("D", "C");
list.remove("C");
list.display();
