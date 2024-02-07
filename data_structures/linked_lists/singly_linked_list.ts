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

type NodeReference = { ref: any };

type ActionParams<T> = {
  data?: T;
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
  find(identifier: any): { data: T; index: number } | null {
    // 1. Itterate through list
    let current: SinglyLinkedListNodeNext<T> = this.#head;
    let count: number = 0;
    while (current && count < identifier) {
      count += 1;
      current = current.next;
    }
    // 2. Return data and count
    return current ? { data: current.data, index: count } : null;
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

/* TODO: Update insert, delete and search methods for detailed 
         search capabilities. Should be able to:

         - insert a new node given an "index" or reference to data already in list
         - delete a node given an "index" or reference to data already in list
         - search for a node given an "index" or reference to data already in list

         e.g.

        class.insert({
          data: {
            name: "Finch",
            age: 20,
          }, 
          identifier: 0
        })  // should insert the data at the "index" 0 since identifier is of type number

        class.insert({
          data: {
            name: "Finch",
            age: 20
          },
          identifier: { ref: 0 }
        })  // should insert the data at the node with data `0` since the identifier is of type object 
                (I'll make this strongly typed to be of type node reference) 

        This would only work for the "insert" method as it needs to take in data and then modify the list
        , the parameters will be strongly typed (including the identifier), the "search" and "delete" 
        methods would take a slightly different arguemt since there's no data to add

        e.g.

        class.delete({
          identifier: 0
        })  // should delete the node at "index" 0 since identifier is of type number  

        class.delete({
          identifier: { ref: 0 }
        })  // should delete the node with data corresponding to `ref` since the indentifier
               is of type object / `node reference` 

        class.find({
          identifier: 0
        })  // should search for data of node at "index" 0 since identifier is of type number  

        class.find({
          identifier: { ref: 0 }
        })  // should search for data of node with data corresponding to `ref` since the indentifier
               is of type object / `node reference` 

        I am going to make the identifier argument strongly typed to be of type `number` or `node reference`
        and the `node reference` will be a type that is a reference to a node in the list, this will allow
        the user to search for data in the list by passing in a reference to the data they are looking for.

        I am also going to add a method to the class that will allow the user to get the data of a node at a
        specific index, this will be useful for the user to get the data of a node at a specific index.

        Steps:

        1. Create a type alias for the parameters of the insert, delete and find methods
          1b. Should contain an optional data property and an identifier property
          1c. Create a type for the identifier property that is a number or a node reference
        2. Update the methods to take in the new parameters
        3. Update the methods to handle the new parameters
*/
