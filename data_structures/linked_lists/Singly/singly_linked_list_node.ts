export type SinglyLinkedListNodeNext<T> = SinglyLinkedListNode<T> | null;

export class SinglyLinkedListNode<T> {
  #data: T;
  #next: SinglyLinkedListNodeNext<T>;
  constructor(data: T, next: SinglyLinkedListNodeNext<T> = null) {
    this.#data = data;
    this.#next = next;
  }
  get data(): T {
    return this.#data;
  }
  set data(value: T) {
    this.#data = value;
  }
  get next(): SinglyLinkedListNodeNext<T> {
    return this.#next;
  }
  set next(value: SinglyLinkedListNodeNext<T>) {
    this.#next = value;
  }
}
