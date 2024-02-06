import { describe, test, expect } from "bun:test";
import { SinglyLinkedListNode } from "../singly_linked_list_node";
// import type { SinglyLinkedListNodeNext } from "../singly_linked_list_node";

describe("Singly Linked List Node", () => {
  const node1 = new SinglyLinkedListNode("node");
  const node2 = new SinglyLinkedListNode({ name: "Finch", age: 20 });
  const node3 = new SinglyLinkedListNode(5);
  test("Should create a new singly linked list with some data", () => {
    expect(node1.data).toBe("node");
  });
  test("Should create a new singly linked list with some data", () => {
    expect(node2.data).toStrictEqual({ name: "Finch", age: 20 });
  });
  test("Should create a new singly linked list with some data", () => {
    expect(node3.data).toBe(5);
  });
});
