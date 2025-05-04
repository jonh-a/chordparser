export const doesArrayContainSubset = (
  parentArray: string[], 
  subArray: string[],
): boolean => subArray.every((e: string) => parentArray.includes(e));