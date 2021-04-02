/**
 * I do not remember the exact signature of the resposne
 * from the question, I believe it was an array of arrays
 * with the first element being the item, and the second
 * element being the count of how many times it appears
 * in the transactions.
 */

/**
 *
 * @param {*} transactions [bin, cat, bin bin]
 * @returns [[bin, 3], [cat, 1]]
 */
function parseTransactions(transactions) {
  let hash = {};

  for (i = 0; i < transactions.length; i++) {
    let key = transactions[i];
    if (hash[key] !== undefined) {
      hash[key]++;
    } else {
      hash[key] = 1;
    }
  }

  return Object.keys(hash).map((item) => [item, hash[item]]);
}

// expected result [[bin, 3], [cat, 1]]
console.log(parseTransactions(['bin', 'cat', 'bin', 'bin']));
