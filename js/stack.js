function node(value) {
  let data = value;
  let next = null;
  return {
    data,
    next,
  };
}

function Stack() {
  let head = null;
  let tail = null;

  function push(data) {
    const newValue = node(data);
    newValue.next = head;
    head = newValue;
    tail = tail || newValue;
  }

  function pop() {
    if (!head) return;
    head = head.next;
  }

  function peek() {
    return head?.data;
  }

  function clear() {
    head = tail = null;
  }

  function display() {
    for (let current = head; current; current = current.next) {
      console.log("display: ", current.data);
    }
  }

  return {
    push,
    pop,
    peek,
    clear,
    display,
  };
}

const stack = Stack();
stack.push("Francis");
stack.push("Arly");
stack.push("Developer");
stack.push("Software");
stack.push("Engineer");
stack.pop();
console.log(stack.peek());
stack.display();
stack.clear()
stack.display()
