import { describe, test, expect, beforeEach } from "bun:test";
import { SinglyLinkedListNode } from "../singly_linked_list_node";
import { SinglyLinkedList } from "../singly_linked_list";

describe("Singly Linked List", () => {
  let singly_linked_list: SinglyLinkedList<string>;
  let node1: SinglyLinkedListNode<string>,
    node2: SinglyLinkedListNode<string>,
    node3: SinglyLinkedListNode<string>,
    node4: SinglyLinkedListNode<string>,
    node5: SinglyLinkedListNode<string>,
    peaches: SinglyLinkedListNode<string>;

  beforeEach(() => {
    singly_linked_list = new SinglyLinkedList();
    node1 = new SinglyLinkedListNode("first");
    node2 = new SinglyLinkedListNode("second");
    node3 = new SinglyLinkedListNode("third");
    node4 = new SinglyLinkedListNode("fourth");
    node5 = new SinglyLinkedListNode("fifth");
    peaches = new SinglyLinkedListNode("peaches");
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
    singly_linked_list.insert({ data: "peaches", identifier: 2 });
    expect(singly_linked_list.print()).toStrictEqual([
      node2.data,
      node1.data,
      "peaches",
      node3.data,
      node4.data,
      node5.data,
    ]);

    singly_linked_list.delete({ identifier: 0 });
    singly_linked_list.delete({ identifier: 2 });
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
  test("insert() should correctly insert a node at a specific index in the list", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.insert({ data: node3.data, identifier: 1 });
    expect(singly_linked_list.print()).toStrictEqual([
      node1.data,
      node3.data,
      node2.data,
    ]);
  });
  test("insert() should correctly insert a node before a node with a specific data value", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.insert({
      data: node3.data,
      identifier: { ref: node2.data },
    });
    expect(singly_linked_list.print()).toStrictEqual([
      node1.data,
      node3.data,
      node2.data,
    ]);
  });

  test("delete() should correctly remove the head of the list when the identifier is 0", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.delete({ identifier: 0 });
    expect(singly_linked_list.print()).toStrictEqual([node2.data]);
  });

  test("delete() should correctly remove a node at a specific index in the list", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.append(node3);
    singly_linked_list.delete({ identifier: 1 });
    expect(singly_linked_list.print()).toStrictEqual([node1.data, node3.data]);
  });
  test("delete() should correctly remove a node with a specific data value", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.append(node3);
    singly_linked_list.delete({ identifier: { ref: node2.data } });
    expect(singly_linked_list.print()).toStrictEqual([node1.data, node3.data]);
  });
  test("find() should correctly return the data and index of a node at a specific index in the list", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.append(node3);
    expect(singly_linked_list.find(1)).toStrictEqual({
      data: node2.data,
      index: 1,
    });
  });

  test("reverse() should correctly reverse the order of the nodes in the list", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.append(node3);
    singly_linked_list.reverse();
    expect(singly_linked_list.print()).toStrictEqual([
      node3.data,
      node2.data,
      node1.data,
    ]);
  });

  test("print() should correctly return an array of the data in the list", () => {
    singly_linked_list.append(node1);
    singly_linked_list.append(node2);
    singly_linked_list.append(node3);
    expect(singly_linked_list.print()).toStrictEqual([
      node1.data,
      node2.data,
      node3.data,
    ]);
  });
});
