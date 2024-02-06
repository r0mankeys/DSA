/*
    A singly linked list node consits of two values:
    - The data
    - A pointer to the next node

    I am going to have the singly linked list node be strongly
    types so that the pointer to the next node must be of type
    singly linked list node or null (null since the node itself 
    might be the tail and will have to point to null)
*/

export type SinglyLinkedListNodeNext = SinglyLinkedListNode | null;

export class SinglyLinkedListNode {
  data: any;
  next: SinglyLinkedListNodeNext;
  constructor(data: any, next: SinglyLinkedListNodeNext = null) {
    this.data = data;
    this.next = next;
  }
}
