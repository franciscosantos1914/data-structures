class Node {
    constructor(value) {
        this.value = value;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    // Função para obter a altura de um nó
    getHeight(node) {
        if (node === null) {
            return 0;
        }
        return node.height;
    }

    // Função para calcular o fator de balanceamento de um nó
    getBalanceFactor(node) {
        if (node === null) {
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Função para atualizar a altura de um nó
    updateHeight(node) {
        if (node !== null) {
            node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        }
    }

    // Função para realizar uma rotação simples à direita
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        // Realiza a rotação
        x.right = y;
        y.left = T2;

        // Atualiza as alturas
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // Função para realizar uma rotação simples à esquerda
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        // Realiza a rotação
        y.left = x;
        x.right = T2;

        // Atualiza as alturas
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // Função para inserir um valor na árvore AVL
    insert(root, value) {
        if (root === null) {
            return new Node(value);
        }

        // Insere o valor na subárvore apropriada
        if (value < root.value) {
            root.left = this.insert(root.left, value);
        } else if (value > root.value) {
            root.right = this.insert(root.right, value);
        } else {
            // Ignora valores duplicados
            return root;
        }

        // Atualiza a altura do nó atual
        this.updateHeight(root);

        // Calcula o fator de balanceamento
        const balance = this.getBalanceFactor(root);

        // Realiza as rotações necessárias para manter o balanceamento
        // À direita-direita
        if (balance > 1 && value < root.left.value) {
            return this.rotateRight(root);
        }

        // À esquerda-esquerda
        if (balance < -1 && value > root.right.value) {
            return this.rotateLeft(root);
        }

        // À esquerda-direita
        if (balance > 1 && value > root.left.value) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }

        // À direita-esquerda
        if (balance < -1 && value < root.right.value) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }

        // Nenhum balanceamento é necessário
        return root;
    }

    // Função de interface para inserção
    insertValue(value) {
        this.root = this.insert(this.root, value);
    }

    // Função para percorrer a árvore em ordem
    inOrderTraversal(root, result = []) {
        if (root !== null) {
            this.inOrderTraversal(root.left, result);
            result.push(root.value);
            this.inOrderTraversal(root.right, result);
        }
        return result;
    }

    // Função de interface para percorrer a árvore em ordem
    inOrder() {
        return this.inOrderTraversal(this.root);
    }
}

// Exemplo de uso da árvore AVL
const avlTree = new AVLTree();

avlTree.insertValue(10);
avlTree.insertValue(20);
avlTree.insertValue(30);
avlTree.insertValue(40);
avlTree.insertValue(50);

console.log("Árvore AVL em ordem:", avlTree.inOrder());
