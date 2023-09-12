// Get the list of available contracts
export const getContracts = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }

  return fetch('https://api.spacetraders.io/v2/my/contracts', options)
}

export const acceptContract = async (contractId: string) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('space_trader_token')
    }
  }

  return fetch(`https://api.spacetraders.io/v2/my/contracts/${contractId}/accept`, options)
}