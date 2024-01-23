const BalanceFactor = {
    BALANCED: 3,
    UNBALANCED_LEFT: 5,
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
};

class Node {
    constructor(data) {
        this.height = 0
        this.left = null
        this.data = data
        this.right = null
    }
}

class AVL {
    constructor() {
        this.root = null
    }

    getNodeHeight(node) {
        if (node == null) return -1
        return Math.max(
            this.getNodeHeight(node.left),
            this.getNodeHeight(node.right)
        ) + 1;
    }

    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) -
            this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    insert(data) {
        this.root = this.insertNode(this.root, data);
    }

    insertNode(node, data) {

        if (node == null) return new Node(data);
        else if (data < node.data) {
            node.left = this.insertNode(node.left, data);
        } else if (data > node.data) {
            node.right = this.insertNode(node.right, data);
        } else return node;

        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (data < node.left.data) {
                node = this.rotationLL(node);
            } else return this.rotationLR(node);
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (data > node.right.data) {
                node = this.rotationRR(node);
            } else return this.rotationRL(node);
        }

        return node;
    }

    removeNode(node, data) {
        node = this.normalRemoveNode(node, data);
        if (node == null) return node;

        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if (
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                return this.rotationLL(node);
            }
            if (
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.rotationLR(node.left);
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right);
            if (
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                return this.rotationRR(node);
            }
            if (
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                return this.rotationRL(node.right);
            }
        }

        return node;
    }

    normalRemoveNode(node, data) {
        if (node == null) return null;

        if (data < node.data) {
            node.left = this.normalRemoveNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this.normalRemoveNode(node.right, data);
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.normalRemoveNode(node.right, aux.key);
            return node;
        }
    }

    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

}