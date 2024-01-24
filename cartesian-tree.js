class Node {
    constructor(key, priority) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.priority = priority;
    }
}

class CartesianTree {
    constructor() {
        this.root = null;
    }

    // Função para inserir um nó na árvore
    insert(key, priority) {
        this.root = this.insertNode(this.root, key, priority);
    }

    // Função auxiliar para inserir um nó na árvore
    insertNode(root, key, priority) {
        // Se a árvore estiver vazia, cria um novo nó
        if (root === null) {
            return new Node(key, priority);
        }

        // Se a chave for menor do que a chave do nó atual, insere à esquerda
        if (key < root.key) {
            const newNode = this.insertNode(root.left, key, priority);
            // Mantém a propriedade do heap
            if (newNode.priority > root.priority) {
                root = this.rotateRight(root);
            }
            if (root && root.left) root.left = newNode;
        }
        // Se a chave for maior ou igual à chave do nó atual, insere à direita
        else {
            const newNode = this.insertNode(root.right, key, priority);
            // Mantém a propriedade do heap
            if (newNode.priority > root.priority) {
                root = this.rotateLeft(root);
            }
            root.right = newNode;
        }

        return root;
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
        if (newRoot && newRoot.right) {
            node.left = newRoot.right;
            newRoot.right = node;
        }
        return newRoot;
    }

    // Função para percorrer a árvore em ordem
    inOrderTraversal(root, result = []) {
        if (root !== null) {
            this.inOrderTraversal(root.left, result);
            result.push({ key: root.key, priority: root.priority });
            this.inOrderTraversal(root.right, result);
        }
        return result;
    }

    // Função de interface para percorrer a árvore em ordem
    inOrder() {
        return this.inOrderTraversal(this.root);
    }
}

// Exemplo de uso da árvore cartesiana
const cartesianTree = new CartesianTree();

cartesianTree.insert(5, 10);
cartesianTree.insert(3, 15);
cartesianTree.insert(8, 5);
cartesianTree.insert(2, 20);
cartesianTree.insert(4, 25);

console.log("Árvore Cartesiana em ordem:", cartesianTree.inOrder());
