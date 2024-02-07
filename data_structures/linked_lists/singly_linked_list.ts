/*
    Javascrtipt implementation of a singly linked list

    A singly linked lists is a data structure that consists of a
    sequence of nodes. These nodes consist of two things:
    - Some data
    - A pointer to the next node in the linked list

    Linked lists typically have their 'head' and 'tail' nodes labelled 
    which correspond to the first and last nodes in the linked list
    respectively

    Linked lists are very similar to arrays (especially javascript arrays
    which aren't of fixed width and dont have to have elements of the same
    type) and so in the case of javascript arrays they are beneficial when
    handling connected data that is subject to reorganization, e.g.

    - A music player
    - Previous and next page button in a web browser
    - Undo / Redo functionality 
    - Image procesing
    - Task scheduling 

    etc.

    Linked lists offer the following basic functionality:

    - Insertion
        - Append
        - Prepend
        - Insert at specific place
    - Deletion
    - Search
    - Reverse

    I am going to add the ability to print all the data in 
    the linked list as an array (to see it all easier) and 
    to see the amount of nodes in the list 
*/
import { SinglyLinkedListNode } from "./singly_linked_list_node";
import type { SinglyLinkedListNodeNext } from "./singly_linked_list_node";

export class SinglyLinkedList {
  head: SinglyLinkedListNodeNext;
  tail: SinglyLinkedListNodeNext;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  get length() {
    let current: SinglyLinkedListNodeNext = this.head;
    let count: number = 0;
    while (current) {
      current = current.next;
      count += 1;
    }
    return count;
  }
  private inputChecker(
    input: any,
    nextValue: SinglyLinkedListNodeNext = null
  ): SinglyLinkedListNode {
    const actualData =
      input instanceof SinglyLinkedListNode ? input.data : input;
    return new SinglyLinkedListNode(actualData, nextValue);
  }
  prepend(data: any) {
    let newNode: SinglyLinkedListNode = this.inputChecker(data, this.head); // no need to check later, check during intialisation
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.head = newNode;
    }
    return this;
  }
  append(data: any) {
    let newNode: SinglyLinkedListNode = this.inputChecker(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      if (this.tail) {
        // set new tail to new node
        this.tail.next = newNode;
        // update this.tail to accuratley reflect change
        this.tail = newNode;
      }
    }
    return this;
  }
  appendMany(data: Array<any>) {
    data.forEach((entry) => this.append(entry));
    return this;
  }
  prependMany(data: Array<any>) {
    data.forEach((entry) => this.prepend(entry));
    return this;
  }
  insert(data: any, identifier: any = undefined) {
    // 1. Check if identifier is at head or tail
    // If so prepend or append the data accodingly
    if (identifier <= 0) {
      this.prepend(data);
    } else if (identifier >= this.length) {
      this.append(data);
    } else {
      // 2. Create an accureate new node of the data
      let newNode = this.inputChecker(data);
      // create pointers at previous and current node
      let previous: SinglyLinkedListNodeNext = this.head;
      let current: SinglyLinkedListNodeNext = this.head;
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
    return this;
  }
  delete(identifier: any) {
    // If identifier is less than or equal to zero remove head
    if (identifier <= 0) {
      this.head = this.head?.next || null;
      if (this.head === null) {
        this.tail = null;
      }
    } else {
      // 1. Set pointers at previous, current and next
      let previous: SinglyLinkedListNodeNext = null;
      let current: SinglyLinkedListNodeNext = this.head;
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
        if (current === this.tail) {
          this.tail = previous;
        }
      }
    }
  }
  find(identifier: any): { data: any; index: number } | null {
    // 1. Check if data is identifier is at head or tail
    if (identifier === 0) {
      return { data: this.head?.data, index: 0 };
    } else if (identifier === this.length - 1) {
      return { data: this.tail?.data, index: this.length - 1 };
    }
    // 2. Itterate through list
    let current: SinglyLinkedListNodeNext = this.head;
    let count: number = 0;
    while (current && count < identifier) {
      count += 1;
      current = current.next;
    }
    // 3. Return data and count
    return current ? { data: current.data, index: count } : null;
  }
  print() {
    let array: Array<SinglyLinkedListNode> = [];
    let current: SinglyLinkedListNodeNext = this.head;
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array;
  }
}
