export interface DoublyLinkedListNodeShape<T> {
  data: T;
  next: DoublyLinkedListNodeShape<T> | null;
  prev: DoublyLinkedListNodeShape<T> | null;
}

export class DoublyLinkedListNode<T> {
  #data: T;
  #prev: DoublyLinkedListNodeShape<T> | null;
  #next: DoublyLinkedListNodeShape<T> | null;
  constructor(
    data: T,
    prev: DoublyLinkedListNodeShape<T> | null = null,
    next: DoublyLinkedListNodeShape<T> | null = null
  ) {
    this.#data = data;
    this.#prev = prev;
    this.#next = next;
  }
  get data(): T {
    return this.#data;
  }
  set data(value: T) {
    this.#data = value;
  }
  get prev(): DoublyLinkedListNodeShape<T> | null {
    return this.#prev;
  }
  set prev(value: DoublyLinkedListNodeShape<T> | null) {
    this.#prev = value;
  }
  get next(): DoublyLinkedListNodeShape<T> | null {
    return this.#next;
  }
  set next(value: DoublyLinkedListNodeShape<T> | null) {
    this.#next = value;
    if (value) {
      value.prev = this;
    }
  }
}
