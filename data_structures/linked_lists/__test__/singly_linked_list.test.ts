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
  const singly_linked_list1 = new SinglyLinkedList();
  const singly_linked_list2 = new SinglyLinkedList();
  const singly_linked_list3 = new SinglyLinkedList();
  const singly_linked_list4 = new SinglyLinkedList();
  const singly_linked_list5 = new SinglyLinkedList();
  const singly_linked_list6 = new SinglyLinkedList();
  const singly_linked_list7 = new SinglyLinkedList();
  const singly_linked_list8 = new SinglyLinkedList();
  const singly_linked_list9 = new SinglyLinkedList();

  let node1 = new SinglyLinkedListNode("first");
  let node2 = new SinglyLinkedListNode("second");
  let node3 = new SinglyLinkedListNode("third");
  let node4 = new SinglyLinkedListNode("fourth");
  let node5 = new SinglyLinkedListNode("fifth");

  singly_linked_list1.append("first");
  singly_linked_list1.prepend("second");

  singly_linked_list2.append(node1);
  singly_linked_list2.prepend(node2);

  singly_linked_list3.append(node1);
  singly_linked_list3.append(node2);
  singly_linked_list3.append(node3);
  singly_linked_list3.append(node4);
  singly_linked_list3.append(node5);

  singly_linked_list6.append(node1);
  singly_linked_list6.append(node2);
  singly_linked_list6.append(node3);
  singly_linked_list6.append(node4);
  singly_linked_list6.append(node5);

  singly_linked_list6.insert("peaches", 2);

  let nodes: Array<SinglyLinkedListNode> = [node1, node2, node3, node4, node5];

  singly_linked_list7.appendMany(nodes);
  singly_linked_list8.prependMany(nodes);
  singly_linked_list9.appendMany(nodes);

  singly_linked_list9.delete(0);
  singly_linked_list9.delete(2);

  test("Length of list should not be one as there are multiple nodes", () => {
    expect(singly_linked_list1.length === 1).toBe(false);
  });
  test("List head should not be equal to the tail", () => {
    expect(singly_linked_list1.head === singly_linked_list1.tail).toBe(false);
  });
  test("List tail should be latest apended value", () => {
    expect(singly_linked_list1.tail).toStrictEqual(node1);
  });
  test("Lists should be identical in spite of one using instances and the other using literals", () => {
    expect(singly_linked_list1).toStrictEqual(singly_linked_list2);
  });
  test("Lists should print all nodes data values to array and return it", () => {
    expect(singly_linked_list3.print()).toStrictEqual([
      node1.data,
      node2.data,
      node3.data,
      node4.data,
      node5.data,
    ]);
  });
  test("Lists should be identical in spite of undergoing two differnent methods, as methods should both add node to beginning", () => {
    expect(singly_linked_list4.append("first")).toStrictEqual(
      singly_linked_list5.insert("first", 0)
    );
  });
  test("Lists should be identical in spite of undergoing two differnent methods, as methods should add node to end", () => {
    expect(singly_linked_list4.append("second")).toStrictEqual(
      singly_linked_list5.insert("second", 1)
    );
  });
  test("Lists should insert node at given `index`", () => {
    expect(singly_linked_list6.print()).toStrictEqual([
      node1.data,
      node2.data,
      "peaches",
      node3.data,
      node4.data,
      node5.data,
    ]);
  });
  test("List should append all nodes in in input array", () => {
    expect(singly_linked_list7.print()).toStrictEqual([
      node1.data,
      node2.data,
      node3.data,
      node4.data,
      node5.data,
    ]);
  });
  test("List should prepend all nodes in input array", () => {
    expect(singly_linked_list8.print()).toStrictEqual([
      node5.data,
      node4.data,
      node3.data,
      node2.data,
      node1.data,
    ]);
  });
  test("List should delete first node in the list", () => {
    expect(singly_linked_list9.print()).toStrictEqual([
      node2.data,
      node3.data,
      // node4.data, // Because below I'm deleting at an index and can't be asked to make a new linked list, works though!!
      node5.data,
    ]);
  });
  test("List should delete a node in the list given an 'index'", () => {
    expect(singly_linked_list9.print()).toStrictEqual([
      node2.data,
      node3.data,
      node5.data,
    ]);
  });
  test("Should return an object with found node", () => {
    expect(singly_linked_list9.find(1)).toStrictEqual({
      data: node3.data,
      index: 1,
    });
  });
});
