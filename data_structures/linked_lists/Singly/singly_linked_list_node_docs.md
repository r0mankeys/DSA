# Singly Linked List Node

## Description

A singly linked list node is a data structure that contains a value (e.g. `data`) and a reference to the next node in the list (e.g. `next`). The value can be of any data type, and the reference to the next node is a pointer to another singly linked list node. The last node in the list has a reference to `null` to indicate the end of the list.

## Properties

- `data`: The value of the node.
- `next`: A reference to the next node in the list.

## Methods

- `get data()` - Returns the value of the node.
- `set data(value)` - Sets the value of the node.
- `get next()` - Returns the reference to the next node in the list.
- `set next(node)` - Sets the reference to the next node in the list.

## Usage

```javascript
const node = new SinglyLinkedListNode(1);
node.data; // 1
node.next; // null
```

```javascript
const node = new SinglyLinkedListNode("https://www.example.com");
node.data; // "https://www.example.com"
node.next; // null
```

```javascript
const node = new SinglyLinkedListNode({ name: "Finch", age: 20 });
node.data; // { name: "Finch", age: 20 }
node.next; // null
```

```javascript
const node = new SinglyLinkedListNode("https://www.example.com");
node.data; // "https://www.example.com"
node.next; // null

node.next = new SinglyLinkedListNode("https://www.example.com/about");

node.next.data; // "https://www.example.com/about"
```
