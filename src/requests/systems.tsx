export const getWaypoints = (system: string, page: number) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token'),
    },
  };

  return fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints?page=${page}&limit=20`, options);
}