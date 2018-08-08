export function isPromiseLike<T = any>(value: any): value is PromiseLike<T> {
  return (
    Boolean(value) &&
    (typeof value === "object" || typeof value === "function") &&
    typeof value.then === "function"
  );
}
