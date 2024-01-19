const Dictionary = Map
const Queue = () => {
    let storage = []
    return {
        dequeue: () => storage.shift(),
        isEmpty: () => storage.length === 0,
        enqueue: value => storage.push(value)
    }
}

class Graph {

    #adjList
    #vertices
    #isDirected

    constructor(isDirected = false) {
        this.#vertices = []
        this.#isDirected = isDirected
        this.#adjList = new Dictionary()
    }

    addVertex(vertex) {
        if (this.#vertices.includes(vertex)) return
        this.#vertices.push(vertex)
        this.#adjList.set(vertex, [])
    }

    addEdge(mainVertex, otherVertex) {
        if (!this.#adjList.has(mainVertex)) this.addVertex(mainVertex)
        if (!this.#adjList.has(otherVertex)) this.addVertex(otherVertex)

        this.#adjList.get(mainVertex).push(otherVertex)
        if (this.#isDirected) return
        this.#adjList.get(otherVertex).push(mainVertex)
    }

    toString() {
        this.#adjList.forEach((value, key) => console.log(`${key}: ${JSON.stringify(value).replace(/,/g, ", ")}`))
    }

    // get all vertices and the shortest path from a vertex to all remaining
    breadthFirstSearch(vertex = this.#vertices[0]) {
        const queue = Queue()
        const allVertex = []
        const visited = Object.create(null)
        const distances = Object.create(null)
        const predecessors = Object.create(null)

        queue.enqueue(vertex)

        for (const v of this.#vertices) {
            distances[v] = 0
            visited[v] = false
            predecessors[v] = null
        }

        while (!queue.isEmpty()) {
            const dequeuedVertex = queue.dequeue()
            const neighbors = this.#adjList.get(dequeuedVertex)

            visited[dequeuedVertex] = true

            for (let neighbor of neighbors) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true
                    queue.enqueue(neighbor)
                    predecessors[neighbor] = dequeuedVertex
                    distances[neighbor] = distances[dequeuedVertex] + 1
                }
            }
            allVertex.push(dequeuedVertex)
        }

        return JSON.parse(JSON.stringify({
            distances,
            allVertex,
            predecessors
        }))

    }

    depthFirstSearch() {
        const allVertex = []
        const visited = Object.create(null)

        for (const v of this.#vertices) {
            visited[v] = false
        }

        function recursive(vertex) {
            visited[vertex] = true
            allVertex.push(vertex)
            const neighbors = this.#adjList.get(vertex)
            for (const neighbor of neighbors) {
                if (!visited[neighbor]) {
                    recursive.bind(this)(neighbor)
                }
            }
        }

        for (const vertex of this.#vertices) {
            if (!visited[vertex]) recursive.bind(this)(vertex)
        }

        return JSON.parse(JSON.stringify({
            allVertex
        }))

    }

    dijkstra(matrix, startVertex) {
        const visited = []
        const distances = []
        const { length } = matrix

        for (let index = 0; index < length; index++) {
            visited[index] = false
            distances[index] = Infinity;
        }

        distances[startVertex] = 0

        function minDistance() {
            let minIndex = -1;
            let min = Infinity;
            for (let index = 0; index < distances.length; index++) {
                if (visited[index] === false && distances[index] <= min) {
                    min = distances[index];
                    minIndex = index
                }
            }
            return minIndex
        }

        for (let _ = 0; _ < length - 1; _++) {
            const minDistanceIndex = minDistance.apply(this)
            visited[minDistanceIndex] = true
            for (let index = 0; index < length; index++) {
                if (!visited[index] &&
                    matrix[minDistanceIndex][index] !== 0 &&
                    distances[minDistanceIndex] !== Infinity &&
                    ((distances[minDistanceIndex] + matrix[minDistanceIndex][index]) < distances[index])
                ) {
                    distances[index] = distances[minDistanceIndex] + matrix[minDistanceIndex][index]
                }
            }
        }
        return distances

    }

    get vertices() {
        return this.#vertices
    }

    get adjList() {
        return this.#adjList
    }

}

function buildGraph() {
    const graph = new Graph()
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    for (let vertex of vertices) {
        graph.addVertex(vertex)
    }

    const vertexAndEdgePairs = [
        ['A', 'B'], ['A', 'C'], ['A', 'D'],
        ['C', 'D'], ['C', 'G'],
        ['D', 'G'], ['D', 'H'],
        ['B', 'E'], ['B', 'F'],
        ['E', 'I']
    ]

    for (const vertexAndEdgePair of vertexAndEdgePairs) {
        graph.addEdge(vertexAndEdgePair[0], vertexAndEdgePair[1])
    }

    return graph
}

const graph = buildGraph()
graph.toString()
console.log(graph.breadthFirstSearch())
console.log(graph.depthFirstSearch());
console.log(
    graph.dijkstra(
        [
            [0, 2, 4, 0, 0, 0],
            [0, 0, 1, 4, 2, 0],
            [0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2],
            [0, 0, 0, 3, 0, 2],
            [0, 0, 0, 0, 0, 0]
        ],
        0
    )
)

