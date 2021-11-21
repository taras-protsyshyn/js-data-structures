class Node {
  constructor(key) {
    this.key = key;
    this.parent = "";
    this.children = [];
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  _checkKey(key, { required } = {}) {
    if (required && !key) {
      throw new Error("Mis key parameter");
    }

    if (!required && !key) return;

    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
  }

  _checkCb(cb) {
    if (typeof cb !== "function") {
      throw new Error("Cb isn't function!");
    }
  }

  add(key, parentKey) {
    this._checkKey(key, { required: true });
    this._checkKey(parentKey);

    const node = new Node(key);

    const parent = parentKey ? this.find(parentKey) : null;

    if (parent) {
      node.parent = parent.key;
      parent.children.push(node);

      return node;
    }

    if (!this.root) {
      this.root = node;
      return node;
    }

    if (parentKey) {
      throw new Error("Can't find node with provided key");
    } else {
      throw new Error("Try to set root when root already exist");
    }
  }

  find(key) {
    this._checkKey(key, { required: true });
    let _node = null;

    this.traverseBFS((node, stopSearch) => {
      if (node.key === key) {
        _node = node;
        stopSearch();
      }
    });

    return _node;
  }

  traverseBFS(cb) {
    const queue = [this.root];
    let stopSearch = false;
    const breakSearch = () => (stopSearch = true);

    while (queue.length && !stopSearch) {
      const node = queue.shift();

      cb(node, breakSearch);

      for (const child of node.children) {
        queue.push(child);
      }
    }
  }

  removeNode(key) {
    this._checkKey(key, { required: true });

    const nodeToRemove = this.find(key);
    const parent = this.find(nodeToRemove.parent);
    parent.children = parent.children.filter((node) => node.key !== nodeToRemove.key);

    return parent;
  }
}

(function main() {
  const tree = new Tree();

  tree.add("Node 1");
  tree.add("Node 1.1", "Node 1");
  tree.add("Node 1.2", "Node 1");
  tree.add("Node 1.3", "Node 1");
  tree.add("Node 1.2.1", "Node 1.2");
  tree.add("Node 1.2.2", "Node 1.2");
  tree.add("Node 1.2.2.1", "Node 1.2.2");
  tree.add("Node 1.3.1", "Node 1.3");
  tree.add("Node 1.3.2", "Node 1.3");

  console.log(JSON.stringify(tree.root, null, 2));

  console.log(tree.find("Node 1.3"));
  tree.removeNode("Node 1.3");

  console.log("<<<<<<<<<<<<<<<<< after remove 'Node 1.3' >>>>>>>>>>>>>>>>>>>>>");

  console.log(JSON.stringify(tree.root, null, 2));

  console.log(tree.find("Node 1.3"));
})();
