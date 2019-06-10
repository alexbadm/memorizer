export interface IItem<T> {
  next: IItem<T> | undefined;
  prev: IItem<T> | undefined;
  value: T;
}

export class LinkedList<T = any> {
  private head: IItem<T> | undefined;
  private tail: IItem<T> | undefined;
  private len: number = 0;
  private readonly limit: number = 0;

  constructor(limit?: number) {
    if (limit) {
      this.limit = limit;
    }
  }

  public find(callback: (element: T) => boolean): undefined | T {
    let current: IItem<T> | undefined = this.head;
    let found: IItem<T> | undefined;
    while (!found && current) {
      if (callback(current.value)) {
        found = current;
      }
      current = current.prev;
    }
    return found && found.value;
  }

  public get length() {
    return this.len;
  }

  public push(newValue: T): number {
    const newHead = ((this.head || { next: undefined }).next = {
      next: undefined,
      prev: this.head,
      value: newValue
    });
    this.head = newHead;

    if (!this.tail) {
      this.tail = newHead;
    }

    if (this.limit && this.len === this.limit) {
      this.prune();
    } else {
      this.len++;
    }
    return this.len;
  }

  public pop(): undefined | T {
    if (this.tail) {
      this.len--;
      return this.prune();
    }
    return undefined;
  }

  private prune(): undefined | T {
    const ret = this.tail;
    if (this.tail) {
      this.tail = this.tail.next;
      if (this.tail) {
        this.tail.prev = undefined;
      } else {
        this.head = undefined;
      }
    }
    return ret && ret.value;
  }
}
