class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class SplayTree {
    constructor() {
        this.root = null;
    }

    // Função para realizar uma rotação à esquerda
    rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }

    // Função para realizar uma rotação à direita
    rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }

    // Função Splay para trazer um nó para a raiz
    splay(value, root) {
        if (root === null || root.value === value) {
            return root;
        }

        // O valor está na subárvore esquerda
        if (value < root.value) {
            // O valor não está na árvore
            if (root.left === null) {
                return root;
            }

            // Zig-Zig (Rotação à direita duas vezes)
            if (value < root.left.value) {
                root.left.left = this.splay(value, root.left.left);
                root = this.rotateRight(root);
            }
            // Zig-Zag (Rotação à esquerda e depois à direita)
            else if (value > root.left.value) {
                root.left.right = this.splay(value, root.left.right);
                if (root.left.right !== null) {
                    root.left = this.rotateLeft(root.left);
                }
            }

            // Realiza a rotação à direita para finalizar
            return (root.left === null) ? root : this.rotateRight(root);
        }
        // O valor está na subárvore direita
        else {
            // O valor não está na árvore
            if (root.right === null) {
                return root;
            }

            // Zag-Zag (Rotação à esquerda duas vezes)
            if (value > root.right.value) {
                root.right.right = this.splay(value, root.right.right);
                root = this.rotateLeft(root);
            }
            // Zag-Zig (Rotação à direita e depois à esquerda)
            else if (value < root.right.value) {
                root.right.left = this.splay(value, root.right.left);
                if (root.right.left !== null) {
                    root.right = this.rotateRight(root.right);
                }
            }

            // Realiza a rotação à esquerda para finalizar
            return (root.right === null) ? root : this.rotateLeft(root);
        }
    }

    // Função para inserir um valor na árvore Splay
    insert(value) {
        this.root = this.splay(value, this.root);

        // Se a raiz for nula, cria um novo nó
        if (this.root === null || this.root.value !== value) {
            const newNode = new Node(value);

            // Se a raiz não for nula, insere o novo nó na posição correta
            if (this.root !== null) {
                if (value < this.root.value) {
                    newNode.right = this.root;
                    newNode.left = this.root.left;
                    this.root.left = null;
                } else {
                    newNode.left = this.root;
                    newNode.right = this.root.right;
                    this.root.right = null;
                }
            }

            this.root = newNode;
        }
    }

    // Função para procurar um valor na árvore Splay
    search(value) {
        this.root = this.splay(value, this.root);
        return (this.root !== null && this.root.value === value);
    }
}

// Exemplo de uso da árvore Splay
const splayTree = new SplayTree();

splayTree.insert(10);
splayTree.insert(5);
splayTree.insert(15);
splayTree.insert(3);
splayTree.insert(7);

console.log("Árvore Splay após inserção:", splayTree.root);

const searchValue = 5;
console.log(`Valor ${searchValue} encontrado?`, splayTree.search(searchValue));
console.log("Árvore Splay após pesquisa:", splayTree.root);
