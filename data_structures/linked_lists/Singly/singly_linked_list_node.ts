/*
    A singly linked list node consits of two values:
    - The data
    - A pointer to the next node

    I am going to have the singly linked list node be strongly
    typed so that the pointer to the next node must be of type
    singly linked list node or null (null since the node itself 
    might be the tail and will have to point to null)
*/

/*
      I am going to update the singly linked list node to have:
      - Type safety for the data 
      - Encapsulation for the data and the pointer to the next node
        - The data and next node will be private and only accessible through methods

      e.g.
      const node = new SinglyLinkedListNode("node");
      console.log(node.data); // "node"
      node.data = "new node";
      console.log(node.data); // "new node"
      console.log(node.next); // null
      node.next = new SinglyLinkedListNode("new node");
      console.log(node.next.data); // "new node"
*/

export type SinglyLinkedListNodeNext<T> = SinglyLinkedListNode<T> | null;

export class SinglyLinkedListNode<T> {
  #data: T;
  #next: SinglyLinkedListNodeNext<T>;
  constructor(data: T, next: SinglyLinkedListNodeNext<T> = null) {
    this.#data = data;
    this.#next = next;
  }
  get data(): T {
    return this.#data;
  }
  set data(value: T) {
    this.#data = value;
  }
  get next(): SinglyLinkedListNodeNext<T> {
    return this.#next;
  }
  set next(value: SinglyLinkedListNodeNext<T>) {
    this.#next = value;
  }
}
