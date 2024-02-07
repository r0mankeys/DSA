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

      const node1 = new SinglyLinkedListNode<string>("node");
      const node2 = new SinglyLinkedListNode<object>({ name: "Finch", age: 20 });
      const node3 = new SinglyLinkedListNode<number>(5);
      console.log(node1.data); // "node"
      console.log(node2.data); // { name: "Finch", age: 20 }
      console.log(node3.data); // 5
      console.log(node1.next); // null
      console.log(node2.next); // null
      console.log(node3.next); // null
      node1.data = "new node";
      console.log(node1.data); // "new node"
      node1.next = node2;
      console.log(node1.next); // { data: "new node", next: SinglyLinkedListNode { data: { name: "Finch", age: 20 }, next: null }}
*/

export type SinglyLinkedListNodeNext<T> = SinglyLinkedListNode<T> | null;

export class SinglyLinkedListNode<T, U = T> {
  #data: T;
  #next: SinglyLinkedListNodeNext<U>;
  constructor(data: T, next: SinglyLinkedListNodeNext<U> = null) {
    this.#data = data;
    this.#next = next;
  }
  get data(): T {
    return this.#data;
  }
  set data(value: T) {
    this.#data = value;
  }
  get next(): SinglyLinkedListNodeNext<U> {
    return this.#next;
  }
  set next(value: SinglyLinkedListNodeNext<U>) {
    this.#next = value;
  }
}

const node1 = new SinglyLinkedListNode<string>("node");
const node2 = new SinglyLinkedListNode<string, object>({
  name: "Finch",
  age: 20,
});
const node3 = new SinglyLinkedListNode<number>(5);
console.log(node1.data); // "node"
console.log(node2.data); // { name: "Finch", age: 20 }
console.log(node3.data); // 5
console.log(node1.next); // null
console.log(node2.next); // null
console.log(node3.next); // null
node1.data = "new node";
console.log(node1.data); // "new node"
node1.next = node2;
console.log(node1.next); // { data: "new node", next: SinglyLinkedListNode { data: { name: "Finch", age: 20 }, next: null }}
