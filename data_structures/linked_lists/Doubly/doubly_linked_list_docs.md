// Documentation for doubly linked list

# Doubly Linked List

## Description

A doubly linked list is a data structure that contains a sequence of elements (called `node`s) in which every element has a reference to the next element in the sequence and a reference to the previous element in the sequence. The first element in the sequence is called the `head`, and the last element is called the `tail`. The `head` has a reference to `null` for the `prev` property, and the `tail` has a reference to `null` for the `next` property to indicate the relative beginning and end of the list.

## Properties

- `head`: The first node in the list.
- `tail`: The last node in the list.

## Methods

- `get head()` - Returns the first node in the list.
- `get tail()` - Returns the last node in the list.
- `get length()` - Returns the number of nodes in the list.
- `prepend(data)` - Adds a new node with the given `data` to the beginning of the list.
- `append(data)` - Adds a new node with the given `data` to the end of the list.
- `insert({ data, identifier })` - Adds a new node with the given `data` before the first node with the given `identifier` in the list.
  - This identifier can either be of type `number` and will correspond to the index of the node in the list, or it can be of type `NodeReference` which is an object with a single property `ref` that is a reference to the data value of a node in the list.
- `delete({ identifier })` - Removes the first node with the given `identifier` from the list.
- `find({ identifier })` - Returns an object with the data and "index" of the first node with the given `identifier` in the list.
- `reverse()` - Reverses the order of the nodes in the list.
- `print()` - Returns an array of the data of all the nodes in the list.

## Usage

```javascript
const list = new DoublyLinkedList();
list.print(); // []
list.length; // 0
list.head; // null
list.tail; // null
```

```javascript
list.append(1);
list.print(); // [1]
list.length; // 1
list.head.data; // 1
list.head.next; // null
list.head.prev; // null
list.tail.data; // 1
list.head === list.tail; // true
```

```javascript
list.append(2);
list.print(); // [1, 2]
list.length; // 2
list.head.data; // 1
list.head.next.data; // 2
list.head.next.prev.data; // 1
list.tail.data; // 2
list.head !== list.tail; // true
```

```javascript
list.prepend(0);
list.print(); // [0, 1, 2]
list.length; // 3
list.head.data; // 0
list.head.prev; // null
list.head.next.data; // 1
list.head.next.prev.data; // 0
list.tail.data; // 2
```

```javascript
list.insert({ data: 1.5, identifier: 1 });
list.print(); // [0, 1.5, 1, 2]
list.length; // 4
list.head.data; // 0
list.head.next.data; // 1.5
list.head.next.prev.data; // 0
list.head.next.next.data; // 1
list.head.next.next.prev.data; // 1.5
list.head.next.next.next.data; // 2
list.head.next.next.next.prev.data; // 1
list.tail.data; // 2
```

```javascript
list.delete({ identifier: 1 });
list.print(); // [0, 1.5, 2]
list.length; // 3
list.head.data; // 0
list.head.next.data; // 1.5
list.head.next.next.data; // 1
list.head.next.next.next.data; // 2
list.tail.data; // 2
```

```javascript
list.find({ identifier: 1 }); // { data: 1.5, index: 1 }
```

```javascript
list.reverse();
list.print(); // [2, 1.5, 0]
list.length; // 3
list.head.data; // 2
list.head.next.data; // 1.5
list.head.next.next.data; // 0
list.tail.data; // 0
```

```javascript
list.reverse();
list.print(); // [0, 1.5, 2]
list.length; // 3
list.head.data; // 0
list.head.next.data; // 1.5
list.head.next.next.data; // 2
list.tail.data; // 2
```

```javascript
list.delete({ identifier: 1 });
list.print(); // [0, 2]
list.length; // 2
list.head.data; // 0
list.head.next.data; // 2
list.tail.data; // 2
```

```javascript
list.delete({ identifier: 0 });
list.print(); // [2]
list.length; // 1
list.head.data; // 2
list.tail.data; // 2
```

```javascript
list.append(3);
list.append(4);
list.append(5);
list.append(6);
list.print(); // [2, 3, 4, 5, 6]
```

```javascript
list.delete({ identifier: { ref: 4 } });
list.print(); // [2, 3, 5, 6]
list.length; // 4
```

```javascript
list.find({ identifier: { ref: 5 } }); // { data: 5, index: 2 }
```

```javascript
list.insert({ data: 4002, identifier: { ref: 6 } });
list.print(); // [2, 3, 5, 4002, 6]
```
