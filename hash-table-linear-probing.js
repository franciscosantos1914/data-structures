class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTableLinearProbing {
  #table;

  constructor() {
    this.#table = {};
  }

  deleteKey(key) {
    if (!this.has(key)) return false;
    const hashedKey = this.#hashCode(key);
    delete this.#table[hashedKey];
    return true;
  }

  logEach() {
    const tableKeys = Object.keys(this.#table);
    tableKeys.forEach((key) => {
      const keyValuePairs = this.#table[key];
      keyValuePairs.forEach((keyValuePair) => {
        console.log(`${keyValuePair.key}: ${keyValuePair.value}`);
      });
    });
  }

  get(key) {
    if (!this.has(key)) return;

    const keyValuePairObject = {};
    const hashedKey = this.#hashCode(key);
    const keyValuePairArray = this.#table[hashedKey];

    keyValuePairArray.forEach((element) => {
      keyValuePairObject[element.key] = element.value;
    });

    return keyValuePairObject;
  }

  has(key) {
    const hashedKey = this.#hashCode(key);
    return (
      hashedKey in this.#table &&
      this.#table[hashedKey] &&
      Array.isArray(this.#table[hashedKey])
    );
  }

  set(key, value) {
    const hashedKey = this.#hashCode(key);
    if (!this.#table[hashedKey] || !Array.isArray(this.#table[hashedKey])) {
      this.#table[hashedKey] = [];
    }
    this.#table[hashedKey].push(new KeyValuePair(key, value));
  }

  size() {
    return Object.keys(this.#table).length;
  }

  #hashCode(str) {
    return this.#djb2HashCode(str);
  }

  #toString(str) {
    return `${str}`;
  }

  #djb2HashCode(str) {
    let hash = 5381;
    const tableKey = this.#toString(str);
    for (let index = 0; index < tableKey.length; index++) {
      hash = hash * 33 + tableKey.charCodeAt(index);
    }
    return hash % 1013;
  }
}

const hashTable = new HashTableLinearProbing();
hashTable.set("test", { a: 1, b: 1 });
hashTable.set(this, Array);
hashTable.set(2, "any thing");
hashTable.set("anyDigitedKey", this);
hashTable.logEach();
console.log(hashTable.size());
console.log(hashTable.has(2));
console.log(hashTable.has("anything"));
console.log(hashTable.get("anything"));
console.log(hashTable.get(this));
hashTable.deleteKey("anyDigitedKey");
hashTable.logEach();
hashTable.set("test", "add one more thing");
hashTable.set("test", "add another more value");
hashTable.logEach();
hashTable.set("test", "add one more thing");
hashTable.set("test", "add another more value");
hashTable.logEach();
