export const getMyAgent = (token: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  return fetch('https://api.spacetraders.io/v2/my/agent', options)
}