export const getMarketData = async (systemSymbol: string, waypointSymbol: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, options)
}