# function-memorizer

The function wrapper preventing repeated calculations.

Published as npm-package (`npm i function-memorizer`)

## Usage

```typescript
import memorizer from "function-memorizer";

function myCalculation(arg1: ISomeObject, arg2: TSomePrimitive): IResult {
  // does some heavy work
  return { txt: "this is the result" };
}

export const myCalc = memorizer(myCalculation);
// The exported function has the same signature as the source one.
```

Memorizer can work with variadic-argument functions.

Functions may be either synchronous or asynchronous.

Function arguments may be any javascript entities (primitives, serializable objects, unserializable objects of functions).

**Important:** memorizer uses strict equality comparison, so two object variables are treated as the same argument only if they refer to the same Object.

### Options

There are two configuration options - limit and timeout.

You can use `timeout` option for expiring values for example.

You can use `limit` options to prevent memory leaks.

```typescript
import memorizer from "function-memorizer";
import produceSomeEntity from "../my/module";

const getSomeEntity = memorizer(produceSomeEntity, { timeout: 600 }); // every cache valid only 600 ms

{
  // some repeating context
  // (http-server handler or for-loop or smth else)
  getSomeEntity(arg1, arg2, ...); // use your function as usual
}

// ---
const getSomeEntity = memorizer(produceSomeEntity, { limit: 100 }); // maximum 100 entries in memory
const getSomeEntity = memorizer(produceSomeEntity, { limit: 100, timeout: 1000 }); // lifetime 1 second for each entry but not more than 100 total
```

There are no eviction algorithms implemented yet. Therefore, the older caches will be deleted first.
