const { isArray } = Array;

module.exports = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  return isEqualedArrays(a, b);
}

/**
 * 
 * @param {string | unknown[]} a 
 * @param {string | unknown[]} b 
 * @returns {Boolean}
 */
const isEqualedArrays = (a, b) => {
  const [aAsArray, bAsArray] = [getArrayValue(a), getArrayValue(b)];
  if (aAsArray === null || bAsArray === null) return false;

  if (aAsArray.length !== bAsArray.length) return false;

  for (var i = 0; i < aAsArray.length; ++i) {
    if (aAsArray[i] !== bAsArray[i]) return false;
  }
  return true;
}

/**
 * 
 * @param {string} arrayAsAString 
 * @returns {boolean} 
 */
const isStringAnArray = (arrayAsAString) => {
  try {
    return isArray(
      JSON.parse(arrayAsAString)
    ) ? true
      : false;
  } catch (e) {
    return false;
  }
}

/**
 * 
 * @param {string | T[]} a 
 * @returns {T[] | null}
 */
const getArrayValue = (a) => {
  const isAnArray = isArray(a) || isStringAnArray(a);
  if (!isAnArray) return null;
  return isStringAnArray(a) ? JSON.parse(a) : a;
}