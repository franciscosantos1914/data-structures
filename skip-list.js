const { log } = console

class Node {
    constructor(key, value, level) {
        this.key = key
        this.up = null
        this.down = null
        this.next = null
        this.level = level
        this.value = value
        this.previous = null
    }
}

class SkipList {
    #size
    #head
    #probability

    constructor(probability = 0.5) {
        this.#size = 0
        this.#probability = probability
        this.#head = new Node(null, null, 0)
    }

    get(key) {
        const node = this.#find(key)
        if (node.key == key) return node.value
        return null
    }

    add(key, value) {
        let node = this.#find(key)

        if (node.key && node.key == key) {
            node.value = value
            return
        }

        let newNode = new Node(key, value, node.level)
        this.#horizontalInsert(node, newNode)
        let currentLevel = node.level
        let headLevel = this.#head.level
        while (this.#isBuildLevel()) {
            if (currentLevel >= headLevel) {
                let newHead = new Node(null, null, headLevel + 1)
                this.#verticalLink(newHead, this.#head)
                this.#head = newHead
                headLevel = this.#head.level
            }
            while (node.up == null) {
                node = node.previous
            }
            node = node.up
            let tmp = new Node(key, value, node.level)
            this.#horizontalInsert(node, tmp)
            this.#verticalLink(tmp, newNode)
            newNode = tmp
            currentLevel++
        }
        this.#size++
    }

    #verticalLink(x, y) {
        y.up = x
        x.down = y
    }

    #isBuildLevel() {
        return Math.random().toFixed(1) < String(this.#probability)
    }

    #horizontalInsert(x, y) {
        y.previous = x
        y.next = x.next
        if (x.next) x.next.previous = y
        x.next = y
    }

    #find(key) {
        let node = this.#head, next, down, nodeKey;
        while (true) {
            next = node.next
            while (next && key >= next.key) {
                node = next
                next = node.next
            }
            nodeKey = node.key
            if (nodeKey && nodeKey == key) break
            down = node.down
            if (down) node = down
            else break
        }
        return node
    }

    remove(key) {
        let node = this.#find(key)
        console.log(node.value)
        if (node && node.key == key) {
            while (node.down) {
                node = node.down
            }
            let prev = null
            let next = null
            for (; node; node = node.up) {
                next = node.next
                prev = node.previous
                if (prev) prev.next = next
                if (next) next.previous = prev
            }
            while (this.#head.next == null && this.#head.down) {
                this.#head = this.#head.down
                this.#head.up = null
            }
            this.#size--
        }
    }

    toString() {
        let current = this.#head
        const { stringify } = JSON
        const data = Object.create(null)

        while (current.down) {
            current = current.down
        }
        while (current.previous) {
            current = current.previous
        }
        if (current.next) current = current.next

        while (current) {
            data[current.key] = current.value
            current = current.next
        }
        return stringify(data)
    }

    toLength() {
        return this.#size
    }

}

const skipList = new SkipList()

for (let index = 0; index < 10; index++) {
    skipList.add(index, String.call(this, [index]))
}

log(skipList.toString())
log(skipList.get(5))
log(skipList.get(15))
skipList.remove(3)
log(skipList.toString())
log(skipList.toLength())
