export function formatChecker(
  expression: string,
  hasFormatter: boolean,
  formatter?: RegExp | null
): boolean {
  if (hasFormatter && formatter) {
    return formatter.test(expression);
  }
  return expression.trim() !== null;
}
