class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.list = null;
  }

  push(value) {
    const node = new StackNode(value);

    node.next = this.list;
    this.list = node;

    return this.list.value;
  }

  get() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }

    const value = this.list.value;
    this.list = this.list.next;

    return value;
  }

  isEmpty() {
    return !this.list;
  }
}

(function main() {
  const stack = new Stack();

  console.log("isEmpty ===>", stack.isEmpty());

  stack.push("Node 1");
  stack.push("Node 2");
  stack.push("Node 4");
  stack.push("Node 5");

  console.log(JSON.stringify(stack, null, 2));
  console.log("isEmpty ===>", stack.isEmpty());

  console.log(JSON.stringify(stack.get(), null, 2));
  console.log(JSON.stringify(stack.get(), null, 2));
  console.log(JSON.stringify(stack.get(), null, 2));

  console.log(JSON.stringify(stack, null, 2));
})();
