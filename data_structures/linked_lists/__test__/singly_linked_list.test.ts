import { describe, test, expect } from "bun:test";
// import { SinglyLinkedListNode } from "../singly_linked_list_node";
import { SinglyLinkedList } from "../singly_linked_list";

describe("Singly Linked List", () => {
  const singly_linked_list = new SinglyLinkedList();
  test("Should be a linked list with a head and taill that are both null", () => {
    expect(
      singly_linked_list.head === null && singly_linked_list.tail === null
    ).toBe(true);
  });
  test("Length of list should be zero as no arguments were given upon instantiation", () => {
    expect(singly_linked_list.length === 0).toBe(true);
  });
});
