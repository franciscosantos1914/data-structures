class CustomArray {
    #array;
    #length;
  
    constructor(length) {
      this.#length = length;
      this.#array = new Array();
    }
  
    #isLengthOver() {
      let response = this.#array.length > this.#length;
      if (response) console.log("isLengthOver");
      return response;
    }
  
    #isSameType(value) {
      if (this.#array.length === 0) return true;
      let response = typeof this.#array[0] === typeof value;
      if (!response) console.log("isNotSameType");
      return response;
    }
  
    addEnd(value) {
      if (this.#isLengthOver()) return;
      if (!this.#isSameType(value)) return;
      this.#array.push(value);
    }
  
    removeEnd() {
      this.#array.pop();
    }
  
    addStart(value) {
      if (this.#isLengthOver()) return;
      if (!this.#isSameType(value)) return;
      this.#array.unshift(value);
    }
  
    removeStart() {
      this.#array.shift();
    }
  
    traverse() {
      for (const element of this.#array) {
        console.log(element);
      }
    }
  
    accessing(index) {
      return this.#array[index];
    }
  
    addMiddle(value) {
      if (this.#isLengthOver()) return;
      if (!this.#isSameType(value)) return;
  
      let length = this.#array.length;
      if (length === 0 || length === 1) {
        this.addStart(value);
        return;
      }
  
      let avgIndex = Math.round(length / 2);
      let newArray = this.#array.slice(avgIndex);
      newArray.unshift(value);
      this.#array.splice(avgIndex, this.#array.length, ...newArray);
    }
  
    removeMiddle() {
      let length = this.#array.length;
      if (length === 0 || length === 1) {
        this.removeStart();
        return;
      }
  
      let avgIndex = Math.round(length / 2);
      let value = this.#array[avgIndex];
      this.#array = this.#array.filter((e) => e != value);
    }
  
    get values() {
      return this.#array;
    }
  }
  
  const array = new CustomArray(5);
  array.addEnd(2);
  console.log("addEnd: ", array.values);
  array.addStart(4);
  console.log("addStart: ", array.values);
  array.addMiddle(6);
  console.log("addMiddle: ", array.values);
  array.addMiddle(8);
  console.log("addMiddle: ", array.values);
  array.addMiddle(10);
  console.log("addMiddle: ", array.values);
  array.addStart("test");
  array.removeEnd();
  console.log("removeEnd: ", array.values);
  array.removeStart();
  console.log("removeStart: ", array.values);
  array.removeMiddle(8);
  console.log("removeMiddle: ", array.values);
  console.log("accessing: ", array.accessing(1));
  array.traverse();
  