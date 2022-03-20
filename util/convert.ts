export const nearToYoctoString = (n: number) => {
  if (n < 0) {
    n = -1 * n;
  }

  return `${n}000000000000000000000000`;
};

export const nearToYoctoValue = (n: number) => {
  if (n < 0) {
    n = -1 * n;
  }

  return n * 1_000_000_000_000_000_000_000_000;
};
