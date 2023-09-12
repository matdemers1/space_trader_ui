export const getAvailableShips = async (systemSymbol:string, waypointSymbol:string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + localStorage.getItem('space_trader_token')
    }
  }
  return  fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`, options)
}

export const purchaseShip = async (waypointSymbol:string, shipType:string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    },
    body: JSON.stringify({
      shipType: shipType,
      waypointSymbol: waypointSymbol
    })
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships`, options)
}