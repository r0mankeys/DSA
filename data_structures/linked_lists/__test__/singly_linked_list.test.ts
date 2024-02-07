import { describe, test, expect, beforeEach } from "bun:test";
import { SinglyLinkedListNode } from "../singly_linked_list_node";
import { SinglyLinkedList } from "../singly_linked_list";

describe("Singly Linked List", () => {
  let singly_linked_list: SinglyLinkedList;
  let node1: SinglyLinkedListNode,
    node2: SinglyLinkedListNode,
    node3: SinglyLinkedListNode,
    node4: SinglyLinkedListNode,
    node5: SinglyLinkedListNode;

  beforeEach(() => {
    singly_linked_list = new SinglyLinkedList();
    node1 = new SinglyLinkedListNode("first");
    node2 = new SinglyLinkedListNode("second");
    node3 = new SinglyLinkedListNode("third");
    node4 = new SinglyLinkedListNode("fourth");
    node5 = new SinglyLinkedListNode("fifth");
  });

  test("Should be a linked list with a head and tail that are both null", () => {
    expect(
      singly_linked_list.head === null && singly_linked_list.tail === null
    ).toBe(true);
    expect(singly_linked_list.length === 0).toBe(true);
  });

  test("Should handle a list with one node", () => {
    singly_linked_list.prepend(node1);
    expect(singly_linked_list.length === 1).toBe(true);
    expect(singly_linked_list.head === singly_linked_list.tail).toBe(true);
  });

  test("Should handle a list with multiple nodes", () => {
    singly_linked_list.append(node1);
    singly_linked_list.prepend(node2);
    singly_linked_list.append(node3);
    singly_linked_list.append(node4);
    singly_linked_list.append(node5);

    expect(singly_linked_list.length > 1).toBe(true);
    expect(singly_linked_list.head !== singly_linked_list.tail).toBe(true);
    expect(singly_linked_list.tail).toStrictEqual(node5);
    expect(singly_linked_list.print()).toStrictEqual([
      node2.data,
      node1.data,
      node3.data,
      node4.data,
      node5.data,
    ]);

    singly_linked_list.insert("peaches", 2);
    expect(singly_linked_list.print()).toStrictEqual([
      node2.data,
      node1.data,
      "peaches",
      node3.data,
      node4.data,
      node5.data,
    ]);

    singly_linked_list.delete(0);
    singly_linked_list.delete(2);
    expect(singly_linked_list.print()).toStrictEqual([
      node1.data,
      "peaches",
      node4.data,
      node5.data,
    ]);

    expect(singly_linked_list.find(1)).toStrictEqual({
      data: "peaches",
      index: 1,
    });

    singly_linked_list.reverse();
    expect(singly_linked_list.print()).toStrictEqual([
      node5.data,
      node4.data,
      "peaches",
      node1.data,
    ]);
  });
});
