export const getMarketData = async (systemSymbol: string, waypointSymbol: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`, options)
}

export const postSellItems = async (shipName: string, itemSymbol: string, quantity: number) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      symbol: itemSymbol,
      units: quantity
    })
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships/${shipName}/sell`, options)
}