// Tests for a doubly linked list
import { describe, test, expect, beforeEach } from "bun:test";
import { DoublyLinkedList } from "../doubly_linked_list";
import { DoublyLinkedListNode } from "../doubly_linked_list_node";
import { OperationCanceledException } from "typescript";

describe("Doubly Linked List", () => {
  let doublyLinkedList: DoublyLinkedList<string>;
  let node1: DoublyLinkedListNode<string>;
  let node2: DoublyLinkedListNode<string>;
  let node3: DoublyLinkedListNode<string>;
  let node4: DoublyLinkedListNode<string>;
  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList();
    node1 = new DoublyLinkedListNode("first");
    node2 = new DoublyLinkedListNode("second");
    node3 = new DoublyLinkedListNode("third");
    node4 = new DoublyLinkedListNode("fourth");
  });
  test("should create a new doubly linked list with a length of 0", () => {
    expect(doublyLinkedList.head).toBeNull();
    expect(doublyLinkedList.tail).toBeNull();
    expect(doublyLinkedList.length).toBe(0);
  });
  test("should prepend a node to the list", () => {
    doublyLinkedList.prepend(node1);
    expect(doublyLinkedList.head).toStrictEqual(node1);
    expect(doublyLinkedList.tail).toStrictEqual(node1);
    expect(doublyLinkedList.length).toBe(1);
  });
  test("should append a node to the list", () => {
    doublyLinkedList.append(node1);
    expect(doublyLinkedList.head).toStrictEqual(node1);
    expect(doublyLinkedList.tail).toStrictEqual(node1);
    expect(doublyLinkedList.length).toBe(1);
  });
  test("appended node should have a previous and next value of null", () => {
    doublyLinkedList.append(node1);
    expect(node1.prev).toBeNull();
    expect(node1.next).toBeNull();
  });
  test("prepended node should have a previous and next value of null", () => {
    doublyLinkedList.prepend(node1);
    expect(node1.prev).toBeNull();
    expect(node1.next).toBeNull();
  });
  test("should append multiple nodes to the list", () => {
    doublyLinkedList.append(node1);
    doublyLinkedList.append(node2);
    doublyLinkedList.append(node3);
    expect(doublyLinkedList.head).toStrictEqual(node1);
    expect(doublyLinkedList.tail).toStrictEqual(node3);
    expect(doublyLinkedList.length).toBe(3);
  });
});
