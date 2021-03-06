import { Enumerable } from "../enumerable";
import wrap from "../common/wrap";

export function entries<T>(array: T[]): Iterable<[number, T]>;
export function entries<TValue>(obj): Iterable<[string, TValue]>;
export function entries<TValue>(objOrArray) {
    return wrap<[string | number, TValue]>(function* () {
        var keys: Iterable<string | number> = Array.isArray(objOrArray) ? objOrArray.keys() : Object.keys(objOrArray);
        for (var key of keys) {
            yield [key, objOrArray[key]];
        }
    });
}

declare module '../enumerable' {
    namespace Enumerable {
        function entries<T>(array: T[]): Enumerable<[number, T]>;
        function entries<TValue>(obj): Enumerable<[string, TValue]>;
    }
}
Enumerable.entries = function <TValue>(objOrArray) {
    return new Enumerable<[any, TValue]>(entries<TValue>(objOrArray));
}