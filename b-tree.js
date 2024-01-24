class Node {
    constructor(leaf = true) {
        this.keys = [];
        this.leaf = leaf;
        this.children = [];
    }
}

class BTree {
    constructor(order) {
        this.root = new Node();
        this.order = order; // Ordem da árvore B
    }

    // Função para inserir uma chave na árvore B
    insert(key) {
        const root = this.root;

        // Se o nó raiz estiver cheio, divide-o e cria um novo nó raiz
        if (root.keys.length === 2 * this.order - 1) {
            const newRoot = new Node(false);
            newRoot.children[0] = root;
            this.splitChild(newRoot, 0);
            this.root = newRoot;
            this.insertNonFull(newRoot, key);
        } else {
            this.insertNonFull(root, key);
        }
    }

    // Função auxiliar para inserir uma chave em um nó não cheio
    insertNonFull(node, key) {
        let i = node.keys.length - 1;

        // Se o nó for uma folha, insere a chave no lugar correto
        if (node.leaf) {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            // Se o nó não for uma folha, encontra o filho apropriado e insere recursivamente
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;

            // Verifica se o filho está cheio, se estiver, divide-o antes de inserir
            if (node.children[i].keys.length === 2 * this.order - 1) {
                this.splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }

            this.insertNonFull(node.children[i], key);
        }
    }

    // Função para dividir um nó filho de um nó pai
    splitChild(parent, index) {
        const order = this.order;
        const child = parent.children[index];
        const newChild = new Node(child.leaf);

        // Move metade das chaves e filhos do nó cheio para o novo nó
        parent.keys.splice(index, 0, child.keys[order - 1]);
        parent.children.splice(index + 1, 0, newChild);

        newChild.keys = child.keys.splice(order, order - 1);
        if (!child.leaf) {
            newChild.children = child.children.splice(order, order);
        }
    }
}

// Exemplo de uso da árvore B
const bTree = new BTree(3); // Árvore B de ordem 3

bTree.insert(1);
bTree.insert(3);
bTree.insert(7);
bTree.insert(10);
bTree.insert(11);
bTree.insert(13);
bTree.insert(14);
bTree.insert(15);
bTree.insert(18);
bTree.insert(16);
bTree.insert(19);
bTree.insert(24);
bTree.insert(25);
bTree.insert(26);
bTree.insert(21);
bTree.insert(4);
bTree.insert(5);
bTree.insert(20);
bTree.insert(22);
bTree.insert(2);

console.log("Árvore B:", bTree);
