class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  root;
  orders = {
    in: [],
    pre: [],
    post: [],
  };

  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new Node(data, null, null);
    if (this.root == null) {
      this.root = newNode;
    } else {
      let parent;
      let current = this.root;

      while (true) {
        parent = current;

        if (data < current.data) {
          current = current.left;
          if (current == null) {
            parent.left = newNode;
            return;
          }
        } else {
          current = current.right;
          if (current == null) {
            parent.right = newNode;
            return;
          }
        }
      }
    }
  }

  inOrder(node) {
    if (node) {
      this.inOrder(node.left);
      this.orders.in.push(node.data);
      this.inOrder(node.right);
    }
  }

  preOrder(node) {
    if (node) {
      this.orders.pre.push(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  postOrder(node) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      this.orders.post.push(node.data);
    }
  }

  getMin() {
    let current = this.root;
    while (true) {
      if (current.left == null) {
        return current.data;
      }
      current = current.left;
    }
  }

  getMinNode(node) {
    let current = node
    while (current && current.left) {
      current = current.left
    }
    return current
  }

  getMax() {
    let current = this.root;
    while (true) {
      if (current.right == null) {
        return current.data;
      }
      current = current.right;
    }
  }

  find(data) {
    let current = this.root;
    while (current.data != data) {
      if (current.data > data) current = current.left;
      if (current.data < data) current = current.right;
      if (current == null) return null;
    }
    return JSON.stringify(current);
  }

  remove(data) {
    this.root = this.#removeNode(this.root, data)
  }

  #removeNode(node, data) {
    if (node == null) return null
    if (data < node.data) {
      node.left = this.#removeNode(node.left, data)
      return node
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data)
      return node
    } else {
      if (node.left == null && node.right == null) {
        node = null
        return node
      }
      if (node.left == null) {
        node = node.right
        return node
      }
      if (node.right == null) {
        node = node.left
        return node
      }
      const tmpNode = this.getMinNode(node.right)
      node.data = tmpNode.data
      node.right = this.#removeNode(node.right, tmpNode.data)
      return node
    }
  }

}

const bst = new BinarySearchTree();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(13);
bst.insert(3);
bst.insert(99);
bst.insert(22);
bst.remove(13);
bst.inOrder(bst.root);
bst.preOrder(bst.root);
bst.postOrder(bst.root);
console.log(`In-Order Traversal: ${bst.orders.in.join(", ")}`);
console.log(`Pre-Order Traversal: ${bst.orders.pre.join(", ")}`);
console.log(`Post-Order Traversal: ${bst.orders.post.join(", ")}`);
console.log(`Min Value: ${bst.getMin()}`);
console.log(`Max Value: ${bst.getMax()}`);
console.log(`Find Value: ${bst.find(37)}`);
