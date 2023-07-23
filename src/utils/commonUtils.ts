/**
 * Get a random pair of items from the array.
 *
 * @param arr The array to pick items from.
 * @param numItems The number of items to pick.
 * @returns An array containing the randomly picked items.
 */
const getRandomPair = <T>(arr: T[], numItems: number) => {
  const result = [];
  const arrayCopy = [...arr];

  for (let i = 0; i < numItems; i++) {
    const randomIndex = Math.floor(Math.random() * arrayCopy.length);
    const randomItem = arrayCopy.splice(randomIndex, 1)[0];
    result.push(randomItem);
  }

  return result;
};

/**
 * Generates a random number-based id.
 * @returns {number} A random number id.
 */
function generateRandomId(): number {
  const randomNumber: number = Math.random() * 10000;
  const randomId: number = Math.floor(randomNumber);
  return randomId;
}

export { getRandomPair, generateRandomId };
