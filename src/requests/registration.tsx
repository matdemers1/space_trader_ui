export const registration = (symbol: string, faction: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol: symbol,
      faction: faction,
    }),
  };

  return fetch('https://api.spacetraders.io/v2/register', options)
}