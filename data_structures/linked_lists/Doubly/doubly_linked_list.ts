import { DoublyLinkedListNode } from "./doubly_linked_list_node";
import type { DoublyLinkedListNodeShape } from "./doubly_linked_list_node";

type NodeReference<T> = { ref: T };

type Index = number;
interface ActionParams<T> {
  data?: T | DoublyLinkedListNode<T>;
  identifier: Index | NodeReference<T>;
}

export class DoublyLinkedList<T> {
  #head: DoublyLinkedListNodeShape<T> | null;
  #tail: DoublyLinkedListNodeShape<T> | null;
  constructor() {
    this.#head = null;
    this.#tail = null;
  }
  get length(): number {
    let length: number = 0;
    let current: DoublyLinkedListNodeShape<T> | null = this.#head;
    while (current) {
      length += 1;
      current = current.next;
    }
    return length;
  }
  get head(): DoublyLinkedListNodeShape<T> | null {
    return this.#head;
  }
  get tail(): DoublyLinkedListNodeShape<T> | null {
    return this.#tail;
  }
  inputCheker(data: T | DoublyLinkedListNodeShape<T>) {
    const actualData = data instanceof DoublyLinkedListNode ? data.data : data;
    return new DoublyLinkedListNode(actualData);
  }
  prepend(data: T | DoublyLinkedListNode<T>) {
    const newNode = this.inputCheker(data);
    if (!this.#head) {
      this.#head = this.#tail = newNode;
      return this;
    }
    newNode.next = this.#head;
    this.#head = newNode;
    return this;
  }
  append(data: T | DoublyLinkedListNode<T>) {
    const newNode = this.inputCheker(data);
    if (!this.#head) {
      this.#head = this.#tail = newNode;
      return this;
    }
    if (this.#tail) {
      this.#tail.next = newNode;
      this.#tail = newNode;
      return this;
    }
  }
  insert({ data, identifier }: ActionParams<T>) {
    if (data && typeof identifier === "number" && identifier <= 0) {
      this.prepend(data);
    } else if (
      data &&
      typeof identifier === "number" &&
      identifier >= this.length
    ) {
      this.append(data);
    } else if (data && typeof identifier === "number") {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      let newNode = this.inputCheker(data);
      let count = 0;
      while (current) {
        if (count === identifier && current.prev) {
          current.prev.next = newNode;
          newNode.next = current;
          return this;
        }
        count += 1;
        current = current.next;
      }
    }
    if (data && identifier instanceof Object) {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      let newNode = this.inputCheker(data);
      while (current) {
        if (current.data === identifier.ref && current.prev) {
          current.prev.next = newNode;
          newNode.next = current;
          return this;
        }
        current = current.next;
      }
    }
  }
  delete({ identifier }: ActionParams<T>) {
    // Handle case where where wanting to delete from the the head node
    if (typeof identifier === "number" && identifier <= 0) {
      this.#head = this.#head?.next || null;
      if (!this.#head) {
        this.#tail = null;
      }
      // Hanlde case where wanting to delete from the tail node
    } else if (
      typeof identifier === "number" &&
      identifier >= this.length &&
      this.#tail &&
      this.#tail.prev
    ) {
      console.log("Current tail: ", this.#tail.data);
      console.log("Thing I want to make tail: ", this.#tail.prev?.data);
      this.#tail.prev.next = null; // This actually deletes the tail
      this.#tail.prev = this.#tail; // This just updates the #tail property
    }
    // Handle case where wanting to delete from the middle of the list
    if (typeof identifier === "number") {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      let count: number = 0;
      while (current) {
        if (count === identifier && current.prev) {
          current.prev.next = current.next;
          return this;
        }
        count += 1;
        current = current.next;
      }
    } else if (identifier instanceof Object) {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      while (current) {
        if (current.data === identifier.ref && current.prev) {
          current.prev.next = current.next;
          return this;
        }
        current = current.next;
      }
    }
  }
  find({ identifier }: ActionParams<T>) {
    if (typeof identifier === "number") {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      let count: number = 0;
      while (current) {
        if (count === identifier) {
          return { data: current.data, index: count };
        }
        count += 1;
        current = current.next;
      }
    } else if (identifier instanceof Object) {
      let current: DoublyLinkedListNodeShape<T> | null = this.#head;
      let count: number = 0;
      while (current) {
        if (current.data === identifier.ref) {
          return { data: current.data, index: count };
        }
        count += 1;
        current = current.next;
      }
    }
    return null;
  }
  print(): Array<T> {
    const result: Array<T> = [];
    let current: DoublyLinkedListNodeShape<T> | null = this.#head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
