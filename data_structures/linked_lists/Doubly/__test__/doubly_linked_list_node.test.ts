import { describe, test, expect } from "bun:test";
import { DoublyLinkedListNode } from "../doubly_linked_list_node";

describe("DoublyLinkedListNode", () => {
  test("should create a new node with the provided data", () => {
    const data = 42;
    const node = new DoublyLinkedListNode(data);

    expect(node.data).toBe(data);
    expect(node.prev).toBeNull();
    expect(node.next).toBeNull();
  });

  test("should set the data of the node", () => {
    const node = new DoublyLinkedListNode(42);
    const newData = 24;

    node.data = newData;

    expect(node.data).toBe(newData);
  });

  test("should set the previous node and have all relative values update correctly", () => {
    const node1 = new DoublyLinkedListNode(42);
    const node2 = new DoublyLinkedListNode(24);

    node1.prev = node2;

    expect(node1.prev).toBe(node2);
    expect(node1.next).toBeNull();
    expect(node2.prev).toBeNull();
  });

  test("should set the next node and have all relative values update correctly", () => {
    const node1 = new DoublyLinkedListNode(42);
    const node2 = new DoublyLinkedListNode(24);

    node1.next = node2;

    expect(node1.next).toBe(node2);
    expect(node1.prev).toBeNull();
    expect(node2.prev).toBe(node1);
    expect(node2.next).toBeNull();
  });
});
