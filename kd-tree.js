class Node {
    constructor(point, dimension, left = null, right = null) {
        this.left = left;
        this.right = right;
        this.point = point;
        this.dimension = dimension;
    }
}

class KDTree {
    constructor(points) {
        this.root = this.buildKDTree(points, 0);
    }

    buildKDTree(points, depth) {
        if (points.length === 0) {
            return null;
        }

        const dimension = depth % points[0].length;
        points.sort((a, b) => a[dimension] - b[dimension]);

        const medianIndex = Math.floor(points.length / 2);
        const medianPoint = points[medianIndex];

        const leftPoints = points.slice(0, medianIndex);
        const rightPoints = points.slice(medianIndex + 1);

        return new Node(
            medianPoint,
            dimension,
            this.buildKDTree(leftPoints, depth + 1),
            this.buildKDTree(rightPoints, depth + 1)
        );
    }

    // Função para encontrar os k vizinhos mais próximos de um ponto
    findNearestNeighbors(queryPoint, k) {
        let best = [];
        let bestDistances = [];
        for (let i = 0; i < k; i++) {
            best.push(null);
            bestDistances.push(Number.MAX_VALUE);
        }

        const findNearest = (node, depth = 0) => {
            if (node === null) {
                return;
            }

            const dimension = depth % queryPoint.length;

            const comparePoint = node.point;
            const queryValue = queryPoint[dimension];
            const nodeValue = comparePoint[dimension];

            const leftChild = (queryValue < nodeValue) ? node.left : node.right;
            const rightChild = (queryValue < nodeValue) ? node.right : node.left;

            findNearest(leftChild, depth + 1);

            const distance = this.distance(queryPoint, comparePoint);

            for (let i = 0; i < k; i++) {
                if (distance < bestDistances[i]) {
                    best.splice(i, 0, comparePoint);
                    bestDistances.splice(i, 0, distance);
                    best.pop();
                    bestDistances.pop();
                    break;
                }
            }

            if (Math.abs(queryValue - nodeValue) < bestDistances[k - 1]) {
                findNearest(rightChild, depth + 1);
            }
        };

        findNearest(this.root);

        return best;
    }

    // Função para calcular a distância euclidiana entre dois pontos
    distance(point1, point2) {
        return Math.sqrt(point1.reduce((sum, val, i) => sum + (val - point2[i]) ** 2, 0));
    }
}

// Exemplo de uso da árvore KD
const points = [
    [2, 3],
    [5, 4],
    [9, 6],
    [4, 7],
    [8, 1],
    [7, 2]
];

const kdTree = new KDTree(points);

const queryPoint = [9, 2];
const k = 2;

const nearestNeighbors = kdTree.findNearestNeighbors(queryPoint, k);
console.log(`Os ${k} vizinhos mais próximos de [${queryPoint}] são:`, nearestNeighbors);
