import { describe, test, expect } from "bun:test";
import { SinglyLinkedListNode } from "../singly_linked_list_node";
import { SinglyLinkedList } from "../singly_linked_list";

describe("Singly Linked List with no nodes", () => {
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

describe("Singly linked list with one node", () => {
  const singly_linked_list = new SinglyLinkedList();
  let node1 = new SinglyLinkedListNode("first");
  singly_linked_list.prepend(node1);

  test("Length of list should be one as there is one node", () => {
    expect(singly_linked_list.length === 1).toBe(true);
  });
  test("List head should be equal to the tail", () => {
    expect(singly_linked_list.head === singly_linked_list.tail).toBe(true);
  });
});

describe("Singly linked list with multiple nodes", () => {
  const singly_linked_list = new SinglyLinkedList();
  let node1 = new SinglyLinkedListNode("first");
  let node2 = new SinglyLinkedListNode("second");
  singly_linked_list.append("first");
  singly_linked_list.prepend("second");

  test("Length of list should not be one as there are multiple nodes", () => {
    expect(singly_linked_list.length === 1).toBe(false);
  });
  test("List head should not be equal to the tail", () => {
    expect(singly_linked_list.head === singly_linked_list.tail).toBe(false);
  });
  test("List tail should be latest apended value", () => {
    expect(singly_linked_list.tail).toStrictEqual(node1);
  });
});
