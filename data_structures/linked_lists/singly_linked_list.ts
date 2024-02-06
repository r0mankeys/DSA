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
}
