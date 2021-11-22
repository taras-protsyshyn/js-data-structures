class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new QueueNode(value);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.size++;

    return this;
  }

  get() {
    if (this.isEmpty()) return false;

    const dequeuedNode = this.first;
    const newFirst = this.first.next;

    if (!newFirst) {
      this.last = newFirst;
    }

    this.first = newFirst;

    dequeuedNode.next = null;

    this.size--;
    return dequeuedNode;
  }

  isEmpty() {
    return this.size === 0;
  }
}

(function main() {
  const queue = new Queue();

  console.log("isEmpty ====>", queue.isEmpty());

  queue.push("node 1");
  queue.push("node 2");
  queue.push("node 3");
  queue.push("node 4");
  queue.push("node 5");
  queue.push("node 6");
  queue.push("node 7");
  queue.push("node 8");

  console.log(JSON.stringify(queue, null, 2));

  console.log(queue.get());
  console.log(queue.get());
  console.log(queue.get());

  console.log(JSON.stringify(queue, null, 2));
  console.log("isEmpty ====>", queue.isEmpty());
})();
