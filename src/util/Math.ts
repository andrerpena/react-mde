/**
 * Calculates modulus, like %, except that it works with negative numbers
 */
export function mod(n, m) {
  return ((n % m) + m) % m;
}
