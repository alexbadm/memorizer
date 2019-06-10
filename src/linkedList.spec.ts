import test from "ava";
import { LinkedList } from "./linkedList";

test("linkedList length", t => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  t.is(list.length, 3);
});

test("linkedList prune", t => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  t.is(list.length, 3);
  list.pop();
  list.pop();
  t.is(list.length, 1);
  list.pop();
  t.is(list.length, 0);
  list.pop();
  t.is(list.length, 0);
});

test("linkedList find", t => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  t.is(list.find(v => v > 1), 3);
  t.is(list.find(v => v < 3), 2);
  t.is(list.find(v => v === 3), 3);
  t.is(list.find(v => v === 4), undefined);
});

test("linkedList limit", t => {
  const list = new LinkedList<number>(6);
  list.push(1);
  list.push(2);
  list.push(3);
  list.push(4);
  list.push(5);
  list.push(6);
  list.push(7);
  list.push(8);
  list.push(9);
  list.push(10);
  list.push(11);
  list.push(12);
  for (let i = 1; i <= 12; i++) {
    t.log("i", i, "value", list.find(v => v === i));
  }
  t.log(list);
  t.is(list.length, 6);
  t.is(list.find(v => v > 1), 12);
  t.is(list.find(v => v < 3), undefined);
  t.is(list.find(v => v === 4), undefined);
  t.is(list.find(v => v === 8), 8);
});
