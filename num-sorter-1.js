class LinkedListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    // Default to empty
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new LinkedListNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return null;
    }

    const returnValue = this.head.value;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.length--;
    return returnValue;
  }

  print() {
    let current = this.head;

    while (current) {
      process.stdout.write(`${current.value} -> `);
      current = current.next;
    }

    console.log("NULL");
  }
}

/*
Above is the given linked list based queue; it should not be modified
Below is the NumSorter class that is to be refactored
*/
class NumSorter {
  constructor() {
    this.numList = new LinkedList();

    this.allowedNums = new LinkedList();
  }

  /*
  Add a number to the list of allowed numbers
  Should not have any duplicates in allowedNums
  */
  addAllowedNum(num) {

    let newNode = new LinkedListNode(num)

    let currentNode = this.allowedNums.head;
    let uniques = [];

    if (this.allowedNums.length > 0) {
      while (currentNode) {
        uniques.push(currentNode.value)
        currentNode = currentNode.next;
      }
    } else {
      currentNode = newNode;
      this.allowedNums.tail = newNode;
      this.allowedNums.length++;
    }

    if (uniques.includes(num)) {
      return `${num} already in allowedNums`
    } else {
      newNode.next = this.allowedNums.head;
      this.allowedNums.head = newNode;
      this.allowedNums.length++;
      return `${num} added to allowedNums`
    }


    // array style
    // if (!this.allowedNums.includes(num)) {
    // this.allowedNums.push(num);
    // return `${num} added to allowedNums`;
    // } else {
    // return `${num} already in allowedNums`;
    // }
  }

  /* Returns true if the number is allowed, false otherwise */
  isNumAllowed(num) {

    let allowed = [];

    let currentNode = this.allowedNums.head;

    if (this.allowedNums.length == 0) {
      return false;
    }

    while (currentNode) {
      allowed.push(currentNode.value);
      currentNode = currentNode.next;
    }

    if (allowed.includes(num)) {
      return true;
    } else {
      return false;
    }
    // array style
    // return this.allowedNums.includes(num);
  }

  /*
  Add a new number to the back of the numList
  Returns value at the back of numList
  */
  addNumToBack(num) {

    let newNode = new LinkedListNode(num);
    let curr = this.numList.head;

    if (this.isNumAllowed(num)) {
      if (this.numList.head) {
        while (curr.next) {
          curr = curr.next;
        }
        curr.next = newNode;
        this.numList.length++;
        return newNode.value;
      } else {
        this.numList.head = newNode;
        this.numList.tail = newNode;
        this.numList.length++;
        return newNode.value;
      }
    } else {
        while (curr.next) {
          curr = curr.next;
        }
        return curr.value;
    }

    // array style
    // if (this.isNumAllowed(num)) this.numList.push(num);
    // return this.numList[this.numList.length - 1];
  }


  /*
  Remove and return the first number in the numList
  If numList is empty, return undefined
  */
  getFirstNum() {

    if (this.numList.length == 0) {
      return undefined;
    } else if (this.numList.length >= 1) {
      let removedHead = this.numList.head;
      this.numList.head = this.numList.head.next;
      this.numList.length--;
      return removedHead.value;
    }

    //array style
    // if(this.numList.length > 0){
    // return this.numList.shift();
    // } else {
    // return undefined;
    // }
  }

  /* Returns the count of nums in numList */
  numCount() {
    return this.numList.length;


    // array style;
    // let count = 0;
    // while (this.numList[count] !== undefined) {
    // count++;
    // }
    // return count;
  }

  /*
  Resets numList, builds a numlist of integers from 0 to amount
  Only include allowed numbers; returns amount of nums in numList
  */
  buildNumList(amount) {
    this.numList = new LinkedList();

    for (let i=0; i<=amount; i++) {
      let newNode = new LinkedListNode(i);
      if (this.isNumAllowed(i)) {
        if (this.numList.length == 0) {
          this.numList.head = newNode;
          this.numList.length++;
        } else {
            this.numList.head.next = newNode;
            this.numList.length++;
        }
      }
    }

    return this.numCount();
  }

}








/* Comment in code below to run local test */
// const newNumSort = new NumSorter(3);
// console.log(newNumSort.addAllowedNum(0));   // '0 added to allowedNums'
// console.log(newNumSort.addAllowedNum(1));   // '1 added to allowedNums'
// console.log(newNumSort.addAllowedNum(1));   // '1 already in allowedNums'
// console.log(newNumSort.addAllowedNum(2));   // '2 added to allowedNums'


// console.log(newNumSort.addNumToBack(1));    // 1
// console.log(newNumSort.addNumToBack(2));    // 2
// console.log(newNumSort.addNumToBack(5));    // 2

// console.log(newNumSort.getFirstNum());      // 1
// console.log(newNumSort.getFirstNum());      // 2
// console.log(newNumSort.getFirstNum());      // undefined

// console.log(newNumSort.numCount());         // 0

// console.log(newNumSort.buildNumList(5));    // 3

// console.log(newNumSort.numCount());         // 3

module.exports = { NumSorter, LinkedList };
