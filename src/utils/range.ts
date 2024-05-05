
/**
 * Return numbers from a to b inclusive
 * @param a 
 * @param b 
 * @returns a to b (inclusive)
 */
export const range = (a: number, b: number) => {
    if (a === undefined || b === undefined || a > b) return []
    return Array(b - a + 1).fill(0).map((_, i) => i + a)
}
console.log(range(-1, 1))
