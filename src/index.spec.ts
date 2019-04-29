import test from "ava";
import memorizer from ".";

// tslint:disable: ban-comma-operator

test("memorizer 1 arg", t => {
  let counter = 0;
  const double = (arg: number) => (counter++, 2 * arg);
  const getDouble = memorizer(double);
  t.is(getDouble(2), 4);
  t.is(getDouble(2), 4);
  t.is(getDouble(3), 6);
  t.is(getDouble(3), 6);
  t.is(counter, 2);
});

test("memorizer 2 args", t => {
  let counter = 0;
  const multiply = (arg1: number, arg2: number) => (counter++, arg1 * arg2);
  const getMultiply = memorizer(multiply);
  t.is(getMultiply(2, 2), 4);
  t.is(getMultiply(2, 2), 4);
  t.is(getMultiply(3, 2), 6);
  t.is(getMultiply(3, 2), 6);
  t.is(getMultiply(5, 4), 20);
  t.is(getMultiply(5, 4), 20);
  t.is(getMultiply(5, 4), 20);
  t.is(getMultiply(5, 4), 20);
  t.is(counter, 3);
});

test("memorizer 5 args", t => {
  let counter = 0;
  const sum = (
    arg1: number,
    arg2: number,
    arg3: string,
    arg4: string,
    arg5: string
  ): [number, string] => (counter++, [arg1 + arg2, `${arg3}-${arg4}-${arg5}`]);
  const getSumWithComment = memorizer(sum);
  t.deepEqual(getSumWithComment(2, 2, "text", "memorizer", "test"), [
    4,
    "text-memorizer-test"
  ]);
  t.deepEqual(getSumWithComment(2, 2, "text", "memorizer", "test"), [
    4,
    "text-memorizer-test"
  ]);
  t.deepEqual(getSumWithComment(3, 2, "text", "memorizer", "test"), [
    5,
    "text-memorizer-test"
  ]);
  t.deepEqual(getSumWithComment(3, 3, "text", "memorizer", "comment"), [
    6,
    "text-memorizer-comment"
  ]);
  t.deepEqual(getSumWithComment(5, 4, "text", "memorizer", "test"), [
    9,
    "text-memorizer-test"
  ]);
  t.deepEqual(getSumWithComment(5, 4, "text", "inverse", "test"), [
    9,
    "text-inverse-test"
  ]);
  t.deepEqual(getSumWithComment(5, 4, "text", "memorizer", "test"), [
    9,
    "text-memorizer-test"
  ]);
  t.deepEqual(getSumWithComment(5, 4, "text", "memorizer", "test"), [
    9,
    "text-memorizer-test"
  ]);
  t.is(counter, 5);
});
