class MinHeap {
    constructor() {
        this.heap = [];
        this.compare = (a, b) => a - b; // função que define a heap como minHeap, para maxHeap: (a, b) => b - a
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    push(value) {
        // Adiciona um elemento à heap e ajusta para manter a propriedade heap
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        // Remove e retorna o elemento de maior prioridade e ajusta para manter a propriedade heap
        if (this.isEmpty()) {
            return null;
        }

        const root = this.heap[0];
        const lastElement = this.heap.pop();

        if (this.size() > 0) {
            this.heap[0] = lastElement;
            this.heapifyDown();
        }

        return root;
    }

    heapifyUp() {
        // Ajusta a heap para cima para manter a propriedade heap
        let currentIndex = this.size() - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);

            if (this.compare(this.heap[currentIndex], this.heap[parentIndex]) < 0) {
                // Troca os elementos se o filho for menor que o pai
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        // Ajusta a heap para baixo para manter a propriedade heap
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let smallestChildIndex = currentIndex;

            if (leftChildIndex < this.size() &&
                this.compare(this.heap[leftChildIndex], this.heap[smallestChildIndex]) < 0) {
                smallestChildIndex = leftChildIndex;
            }

            if (rightChildIndex < this.size() &&
                this.compare(this.heap[rightChildIndex], this.heap[smallestChildIndex]) < 0) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex !== currentIndex) {
                // Troca os elementos se o filho for menor que o pai
                this.swap(currentIndex, smallestChildIndex);
                currentIndex = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        // Função auxiliar para trocar dois elementos na heap
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

const minHeap = new MinHeap();
minHeap.push(4);
minHeap.push(2);
minHeap.push(7);
minHeap.push(1);

console.log(minHeap.pop()); 
console.log(minHeap.pop());
