interface IMemoValue<T> {
  inputs: any[];
  output: T;
  prev: IMemoValue<T> | undefined;
}

interface IMemorizerOptions {
  /**
   * Limit defines the maximum number of cached items.
   */
  limit?: number;
  /**
   * Timeout defines lifetime for cache in milliseconds.
   */
  timeout?: number;
}

function memorizer<TResult, T1>(
  func: (arg1: T1) => TResult,
  options?: IMemorizerOptions
): (arg1: T1) => TResult;
function memorizer<TResult, T1, T2>(
  func: (arg1: T1, arg2: T2) => TResult,
  options?: IMemorizerOptions
): (arg1: T1, arg2: T2) => TResult;
function memorizer<TResult, T1, T2, T3>(
  func: (arg1: T1, arg2: T2, arg3: T3) => TResult,
  options?: IMemorizerOptions
): (arg1: T1, arg2: T2, arg3: T3) => TResult;
function memorizer<TResult, T1, T2, T3, T4>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult,
  options?: IMemorizerOptions
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => TResult;
function memorizer<TResult, T1, T2, T3, T4, T5>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult,
  options?: IMemorizerOptions
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => TResult;
function memorizer<TResult, T1, T2, T3, T4, T5, T6>(
  func: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult,
  options?: IMemorizerOptions
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => TResult;

function memorizer<TResult>(
  func: (...args: any[]) => TResult,
  options?: IMemorizerOptions
): (...args: any[]) => TResult {
  const argumentsCount = func.length;
  let memo: IMemoValue<TResult> | undefined;
  // const limit = options && options.limit || 1000; // todo: implement limiting
  const timeout = options && options.timeout;

  return (...arg: any[]): TResult => {
    const cached = findValue(memo, arg);
    if (cached) {
      return cached;
    }

    const out = func(...arg);
    memo = {
      inputs: arg,
      output: out,
      prev: memo
    };
    if (timeout) {
      removeAfter(timeout, memo);
    }
    return out;
  };

  function findValue<T>(
    lvl: IMemoValue<T> | undefined,
    arg: any[]
  ): T | undefined {
    if (!lvl) {
      return undefined;
    }
    for (let i = 0; i < argumentsCount; i++) {
      if (arg[i] !== lvl.inputs[i]) {
        return findValue(lvl.prev, arg);
      }
    }
    return lvl.output;
  }

  function removeAfter(after: number, item: IMemoValue<TResult>): void {
    setTimeout(() => {
      if (!memo) {
        return;
      }
      if (memo === item) {
        memo = undefined;
        return;
      }
      let n: IMemoValue<TResult> = memo;
      while (n.prev && n.prev !== item) {
        n = n.prev;
      }
      n.prev = undefined;
    }, after);
  }
}

export = memorizer;
