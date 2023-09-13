export const getMyShips = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships`, options)
}

export const getShip = async (symbol: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}`, options)
}

export const orbitShip = async (symbol: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}/orbit`, options)
}

export const dockShip = async (symbol: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }
  return fetch(`https://api.spacetraders.io/v2/my/ships/${symbol}/dock`, options)
}