export const getMyAgent = () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('space_trader_token')}`
    },
  };

  return fetch('https://api.spacetraders.io/v2/my/agent', options)
}