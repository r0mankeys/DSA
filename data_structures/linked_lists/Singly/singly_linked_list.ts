import { SinglyLinkedListNode } from "./singly_linked_list_node";
import type { SinglyLinkedListNodeNext } from "./singly_linked_list_node";

type NodeReference = { ref: any };

type ActionParams<T> = {
  data?: T | SinglyLinkedListNode<T>;
  identifier: number | NodeReference;
};

export class SinglyLinkedList<T> {
  #head: SinglyLinkedListNodeNext<T>;
  #tail: SinglyLinkedListNodeNext<T>;
  constructor() {
    this.#head = null;
    this.#tail = null;
  }
  get head() {
    return this.#head;
  }
  get tail() {
    return this.#tail;
  }
  get length() {
    let current: SinglyLinkedListNodeNext<T> = this.#head;
    let count: number = 0;
    while (current) {
      current = current.next;
      count += 1;
    }
    return count;
  }
  private inputChecker(
    input: T | SinglyLinkedListNode<T>,
    nextValue: SinglyLinkedListNodeNext<T> = null
  ): SinglyLinkedListNode<T> {
    const actualData =
      input instanceof SinglyLinkedListNode ? input.data : input;
    return new SinglyLinkedListNode(actualData, nextValue);
  }
  prepend(data: T | SinglyLinkedListNode<T>) {
    let newNode: SinglyLinkedListNode<T> = this.inputChecker(data, this.#head); // no need to check later, check during intialisation
    if (!this.#tail) {
      this.#head = this.#tail = newNode;
    } else {
      this.#head = newNode;
    }
    return this;
  }
  append(data: T | SinglyLinkedListNode<T>) {
    let newNode: SinglyLinkedListNode<T> = this.inputChecker(data);
    if (!this.#head) {
      this.#head = this.#tail = newNode;
    } else {
      if (this.#tail) {
        // set new tail to new node
        this.#tail.next = newNode;
        // update this.tail to accuratley reflect change
        this.#tail = newNode;
      }
    }
    return this;
  }
  insert({ data, identifier }: ActionParams<T>) {
    // 1. Check if identifier is at head or tail
    // If so prepend or append the data accodingly
    if (data && typeof identifier === "number" && identifier <= 0) {
      this.prepend(data);
    } else if (
      data &&
      typeof identifier === "number" &&
      identifier >= this.length
    ) {
      this.append(data);
    } else if (data && typeof identifier === "number") {
      // 2. Create an accureate new node of the data
      let newNode = this.inputChecker(data);
      // create pointers at previous and current node
      let previous: SinglyLinkedListNodeNext<T> = this.#head;
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      let count: number = 0;
      // 3. Itterate through the list until index is hit
      while (previous && current && count < identifier) {
        count += 1;
        previous = current;
        current = current.next;
      }
      // 4. Set previous.next to newNode, set newNode.next to current
      if (previous && current) {
        newNode.next = current;
        previous.next = newNode;
      }
    }
    if (data && identifier instanceof Object) {
      let newNode = this.inputChecker(data);
      let previous: SinglyLinkedListNodeNext<T> = this.#head;
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      while (previous && current && current.data !== identifier.ref) {
        previous = current;
        current = current.next;
      }
      if (previous && current) {
        newNode.next = current;
        previous.next = newNode;
      }
    }
    return this;
  }
  delete({ identifier }: ActionParams<T>) {
    // If identifier is less than or equal to zero remove head
    if (typeof identifier === "number" && identifier <= 0) {
      this.#head = this.#head?.next || null;
      if (!this.#head) {
        this.#tail = null;
      }
    } else if (typeof identifier === "number") {
      // 1. Set pointers at previous, current and next
      let previous: SinglyLinkedListNodeNext<T> = null;
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      let count: number = 0;
      // 2. Traverse the linked list until the "index" is hit
      while (current && count < identifier) {
        count += 1;
        previous = current;
        current = current.next;
      }
      // 3. Set previous.next equal to current.next and the current.next = null
      if (previous) {
        previous.next = current?.next || null;
        if (current === this.#tail) {
          this.#tail = previous;
        }
      }
      return current ? current.data : null;
    }
    if (identifier instanceof Object) {
      let previous: SinglyLinkedListNodeNext<T> = null;
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      while (current && current.data !== identifier.ref) {
        previous = current;
        current = current.next;
      }
      if (previous) {
        previous.next = current?.next || null;
        if (current === this.#tail) {
          this.#tail = previous;
        }
      }
      return current ? current.data : null;
    }
  }
  find({ identifier }: ActionParams<T>): { data: T; index: number } | null {
    // 1. Itterate through list
    if (typeof identifier === "number") {
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      let count: number = 0;
      while (current && count < identifier) {
        count += 1;
        current = current.next;
      }
      // 2. Return data and count
      return current ? { data: current.data, index: count } : null;
    } else if (identifier instanceof Object) {
      let current: SinglyLinkedListNodeNext<T> = this.#head;
      let count: number = 0;
      while (current && current.data !== identifier.ref) {
        count += 1;
        current = current.next;
      }
      return current ? { data: current.data, index: count } : null;
    }
    return null;
  }
  reverse() {
    let current: SinglyLinkedListNodeNext<T> = this.#head;
    let previous: SinglyLinkedListNodeNext<T> = null;
    let next: SinglyLinkedListNodeNext<T> = null;
    // 1. Iterate through over the list
    while (current) {
      next = current.next; // store next node
      current.next = previous; // set current.next to previous node
      previous = current; // set previous to current
      current = next; // move to next node
    }
    // 2. Swap the head and tail to reflect the change
    this.#tail = this.#head;
    this.#head = previous;
    return this;
  }
  print() {
    let array: Array<T> = [];
    let current: SinglyLinkedListNodeNext<T> = this.#head;
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }
}
