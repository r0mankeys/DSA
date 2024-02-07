# Doubly Linked List Node

## Description

A doubly linked list node is a data structure that contains a value (e.g. `data`) and references to the previous and next nodes in the list (e.g. `prev` and `next`). The value can be of any data type, and the references to the previous and next nodes are pointers to other doubly linked list nodes. The first node in the list has a reference to `null` for the `prev` property, and the last node in the list has a reference to `null` for the `next` property.

## Properties

- `data`: The value of the node.
- `prev`: A reference to the previous node in the list.
- `next`: A reference to the next node in the list.

## Methods

- `get data()` - Returns the value of the node.
- `set data(value)` - Sets the value of the node.
- `get prev()` - Returns the reference to the previous node in the list.
- `set prev(node)` - Sets the reference to the previous node in the list.
- `get next()` - Returns the reference to the next node in the list.
- `set next(node)` - Sets the reference to the next node in the list.

## Usage

```javascript
const node = new DoublyLinkedListNode(1);
node.data; // 1
node.prev; // null
node.next; // null
```

```javascript
const node = new DoublyLinkedListNode("https://www.example.com");
node.data; // "https://www.example.com"
node.prev; // null
node.next; // null
```

```javascript
const node = new DoublyLinkedListNode({ name: "Finch", age: 20 });
node.data; // { name: "Finch", age: 20 }
node.prev; // null
node.next; // null
```

```javascript
const node = new DoublyLinkedListNode("https://www.example.com");
node.data; // "https://www.example.com"
node.prev; // null
node.next; // null
node.next = new DoublyLinkedListNode("https://www.example.com/about");
node.data.next; // "https://www.example.com/about"
node.next.prev; // node
node.next.next; // null
node.prev; // null
```
