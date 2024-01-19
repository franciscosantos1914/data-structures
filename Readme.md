# Projeto de Estruturas de Dados em JavaScript

## Visão Geral

Este projeto consiste na implementação de 8 estruturas de dados diferentes em JavaScript. Cada estrutura de dados é projetada para resolver problemas específicos e proporcionar uma base sólida para o desenvolvimento de software.

## Estruturas de Dados

1. **Lista Encadeada**

   - Descrição: Uma lista de elementos conectados, onde cada elemento aponta para o próximo na sequência.

2. **Pilha**

   - Descrição: Uma coleção de elementos com operações Last In, First Out (LIFO).

3. **Fila**

   - Descrição: Uma coleção de elementos com operações First In, First Out (FIFO).

4. **Árvore Binária**

   - Descrição: Uma estrutura hierárquica onde cada nó tem, no máximo, dois filhos.

5. **Tabela Hash**

   - Descrição: Uma estrutura que mapeia chaves para valores, proporcionando acesso rápido aos dados.

6. **Grafo**

   - Descrição: Uma representação de conexões entre diferentes entidades.

## Demonstração de Uso

Aqui está um exemplo de como implementar Grafos em JavaScript:

```javascript
// Exemplo de uso de Grafos

const Dictionary = Map;
const Queue = () => {
  let storage = [];
  return {
    dequeue: () => storage.shift(),
    isEmpty: () => storage.length === 0,
    enqueue: (value) => storage.push(value),
  };
};

class Graph {
  #adjList;
  #vertices;
  #isDirected;

  constructor(isDirected = false) {
    this.#vertices = [];
    this.#isDirected = isDirected;
    this.#adjList = new Dictionary();
  }

  addVertex(vertex) {
    if (this.#vertices.includes(vertex)) return;
    this.#vertices.push(vertex);
    this.#adjList.set(vertex, []);
  }

  addEdge(mainVertex, otherVertex) {
    if (!this.#adjList.has(mainVertex)) this.addVertex(mainVertex);
    if (!this.#adjList.has(otherVertex)) this.addVertex(otherVertex);

    this.#adjList.get(mainVertex).push(otherVertex);
    if (this.#isDirected) return;
    this.#adjList.get(otherVertex).push(mainVertex);
  }

  toString() {
    this.#adjList.forEach((value, key) =>
      console.log(`${key}: ${JSON.stringify(value).replace(/,/g, ", ")}`)
    );
  }

  // get all vertices and the shortest path from a vertex to all remaining
  breadthFirstSearch(vertex = this.#vertices[0]) {
    const queue = Queue();
    const allVertex = [];
    const visited = Object.create(null);
    const distances = Object.create(null);
    const predecessors = Object.create(null);

    queue.enqueue(vertex);

    for (const v of this.#vertices) {
      distances[v] = 0;
      visited[v] = false;
      predecessors[v] = null;
    }

    while (!queue.isEmpty()) {
      const dequeuedVertex = queue.dequeue();
      const neighbors = this.#adjList.get(dequeuedVertex);

      visited[dequeuedVertex] = true;

      for (let neighbor of neighbors) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.enqueue(neighbor);
          predecessors[neighbor] = dequeuedVertex;
          distances[neighbor] = distances[dequeuedVertex] + 1;
        }
      }
      allVertex.push(dequeuedVertex);
    }

    return JSON.parse(
      JSON.stringify({
        distances,
        allVertex,
        predecessors,
      })
    );
  }

  depthFirstSearch() {
    const allVertex = [];
    const visited = Object.create(null);

    for (const v of this.#vertices) {
      visited[v] = false;
    }

    function recursive(vertex) {
      visited[vertex] = true;
      allVertex.push(vertex);
      const neighbors = this.#adjList.get(vertex);
      for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
          recursive.bind(this)(neighbor);
        }
      }
    }

    for (const vertex of this.#vertices) {
      if (!visited[vertex]) recursive.bind(this)(vertex);
    }

    return JSON.parse(
      JSON.stringify({
        allVertex,
      })
    );
  }

  dijkstra(matrix, startVertex) {
    const visited = [];
    const distances = [];
    const { length } = matrix;

    for (let index = 0; index < length; index++) {
      visited[index] = false;
      distances[index] = Infinity;
    }

    distances[startVertex] = 0;

    function minDistance() {
      let minIndex = -1;
      let min = Infinity;
      for (let index = 0; index < distances.length; index++) {
        if (visited[index] === false && distances[index] <= min) {
          min = distances[index];
          minIndex = index;
        }
      }
      return minIndex;
    }

    for (let _ = 0; _ < length - 1; _++) {
      const minDistanceIndex = minDistance.apply(this);
      visited[minDistanceIndex] = true;
      for (let index = 0; index < length; index++) {
        if (
          !visited[index] &&
          matrix[minDistanceIndex][index] !== 0 &&
          distances[minDistanceIndex] !== Infinity &&
          distances[minDistanceIndex] + matrix[minDistanceIndex][index] <
            distances[index]
        ) {
          distances[index] =
            distances[minDistanceIndex] + matrix[minDistanceIndex][index];
        }
      }
    }
    return distances;
  }

  get vertices() {
    return this.#vertices;
  }

  get adjList() {
    return this.#adjList;
  }
}

function buildGraph() {
  const graph = new Graph();
  const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  for (let vertex of vertices) {
    graph.addVertex(vertex);
  }

  const vertexAndEdgePairs = [
    ["A", "B"],
    ["A", "C"],
    ["A", "D"],
    ["C", "D"],
    ["C", "G"],
    ["D", "G"],
    ["D", "H"],
    ["B", "E"],
    ["B", "F"],
    ["E", "I"],
  ];

  for (const vertexAndEdgePair of vertexAndEdgePairs) {
    graph.addEdge(vertexAndEdgePair[0], vertexAndEdgePair[1]);
  }

  return graph;
}

const graph = buildGraph();

graph.toString();
/*
   Output:
   A: ["B", "C", "D"]
   B: ["A", "E", "F"]
   C: ["A", "D", "G"]
   D: ["A", "C", "G", "H"]
   E: ["B", "I"]
   F: ["B"]
   G: ["C", "D"]
   H: ["D"]
   I: ["E"]
*/

console.log(graph.breadthFirstSearch());
/*
   Output:
   {
      distances: { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 },
      allVertex: [
         'A', 'B', 'C',
         'D', 'E', 'F',
         'G', 'H', 'I'
      ],
      predecessors: {
         A: null,
         B: 'A',
         C: 'A',
         D: 'A',
         E: 'B',
         F: 'B',
         G: 'C',
         H: 'D',
         I: 'E'
      }
   }
*/

console.log(graph.depthFirstSearch());
/*
   Output:
   {
      allVertex: [
         'A', 'B', 'E',
         'I', 'F', 'C',
         'D', 'G', 'H'
      ]
   }
*/

console.log(
  graph.dijkstra(
    [
      [0, 2, 4, 0, 0, 0],
      [0, 0, 1, 4, 2, 0],
      [0, 0, 0, 0, 3, 0],
      [0, 0, 0, 0, 0, 2],
      [0, 0, 0, 3, 0, 2],
      [0, 0, 0, 0, 0, 0],
    ],
    0
  )
);
/*
   Output:
   [ 0, 2, 3, 6, 4, 6 ]
*/

```
