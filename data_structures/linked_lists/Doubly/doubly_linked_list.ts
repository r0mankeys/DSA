import { DoublyLinkedListNode } from "./doubly_linked_list_node";
import type { DoublyLinkedListNodeShape } from "./doubly_linked_list_node";

type NodeReference<T> = { ref: T };
interface ActionParams<T> {
  data?: T | DoublyLinkedListNode<T>;
  identifier: number | NodeReference<T>;
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
