export const doesArrayContainSubset = (
  parentArray: string[], 
  subArray: string[],
): boolean => subArray.every((e: string) => parentArray.includes(e));

export const areArraysEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
};