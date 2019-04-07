export function fetchTokenData() {
  // Initialize Object
  const token = {
    id: 'DOT',
    name: 'DOT',
    symbol: 'DOT',
    decimals: 18,
    granularity: 1,
    address: 'none',
  };
  return token;
}

export async function fetchTokenBalance() {
  const amount = 0.0;

  return amount;
}

export async function sendToken() {
  throw new Error('Not implemented send Token function');
}
