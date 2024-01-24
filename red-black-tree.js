const RED = "RED";
const BLACK = "BLACK";

class RedBlackTreeNode {
    constructor(key, color) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = color;
    }
}

class RedBlackTree {
    constructor() {
        this.NIL = new RedBlackTreeNode(null, BLACK); // Nó sentinela
        this.root = this.NIL;
    }

    // Função para inserir um nó na árvore
    insert(key) {
        const newNode = new RedBlackTreeNode(key, RED);
        this._insert(newNode);
        this.fixInsert(newNode);
    }

    // Função auxiliar para inserir um nó na árvore
    _insert(node) {
        let parent = null;
        let current = this.root;

        while (current !== this.NIL) {
            parent = current;
            if (node.key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        node.parent = parent;
        if (parent === null) {
            this.root = node;
        } else if (node.key < parent.key) {
            parent.left = node;
        } else {
            parent.right = node;
        }

        node.left = this.NIL;
        node.right = this.NIL;
        node.color = RED;
    }

    // Função para corrigir o balanceamento após a inserção
    fixInsert(node) {
        while (node.parent !== null && node.parent.color === RED) {
            if (node.parent === node.parent.parent.left) {
                let uncle = node.parent.parent.right;

                if (uncle.color === RED) {
                    node.parent.color = BLACK;
                    uncle.color = BLACK;
                    node.parent.parent.color = RED;
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.leftRotate(node);
                    }

                    node.parent.color = BLACK;
                    node.parent.parent.color = RED;
                    this.rightRotate(node.parent.parent);
                }
            } else {
                let uncle = node.parent.parent.left;

                if (uncle.color === RED) {
                    node.parent.color = BLACK;
                    uncle.color = BLACK;
                    node.parent.parent.color = RED;
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }

                    node.parent.color = BLACK;
                    node.parent.parent.color = RED;
                    this.leftRotate(node.parent.parent);
                }
            }
        }

        this.root.color = BLACK;
    }

    // Função para realizar uma rotação à esquerda
    leftRotate(node) {
        let rightChild = node.right;
        node.right = rightChild.left;

        if (rightChild.left !== this.NIL) {
            rightChild.left.parent = node;
        }

        rightChild.parent = node.parent;

        if (node.parent === null) {
            this.root = rightChild;
        } else if (node === node.parent.left) {
            node.parent.left = rightChild;
        } else {
            node.parent.right = rightChild;
        }

        rightChild.left = node;
        node.parent = rightChild;
    }

    // Função para realizar uma rotação à direita
    rightRotate(node) {
        let leftChild = node.left;
        node.left = leftChild.right;

        if (leftChild.right !== this.NIL) {
            leftChild.right.parent = node;
        }

        leftChild.parent = node.parent;

        if (node.parent === null) {
            this.root = leftChild;
        } else if (node === node.parent.right) {
            node.parent.right = leftChild;
        } else {
            node.parent.left = leftChild;
        }

        leftChild.right = node;
        node.parent = leftChild;
    }

    // Função para percorrer a árvore em ordem
    inOrderTraversal(root, result = []) {
        if (root !== null && root !== this.NIL) {
            this.inOrderTraversal(root.left, result);
            result.push({ key: root.key, color: root.color });
            this.inOrderTraversal(root.right, result);
        }
        return result;
    }

    // Função de interface para percorrer a árvore em ordem
    inOrder() {
        return this.inOrderTraversal(this.root);
    }
}

// Exemplo de uso da árvore Rubro-Negra
const redBlackTree = new RedBlackTree();

redBlackTree.insert(10);
redBlackTree.insert(5);
redBlackTree.insert(15);
redBlackTree.insert(3);
redBlackTree.insert(7);

console.log("Árvore Rubro-Negra em ordem:", redBlackTree.inOrder());
