import { LinkedList } from "./linkedList";

interface IMemoValue<T> {
  inputs: IArguments;
  output: T;
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
  const list = new LinkedList<IMemoValue<TResult>>(
    (options && options.limit) || 1000
  );

  const timeout = options && options.timeout;
  const pop = () => list.pop();
  const prune = timeout ? () => setTimeout(pop, timeout) : () => null;

  // tslint:disable-next-line: only-arrow-functions
  return function(): TResult {
    const args = arguments;
    const cached = list.find(memo => {
      for (let i = 0; i < argumentsCount; i++) {
        if (args[i] !== memo.inputs[i]) {
          return false;
        }
      }
      return true;
    });

    if (cached) {
      return cached.output;
    }

    const output = func.apply(null, Array.from(arguments));
    list.push({ inputs: arguments, output });

    prune();
    return output;
  };
}

export = memorizer;
