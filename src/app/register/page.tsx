'use client'
import { SetStateAction, useState} from 'react'
import {Box, Card, CardContent, Typography, TextField, Button, Select, MenuItem} from '@mui/material'
import {registration} from "@/requests/registration";
import {FactionSymbols} from "@/common/models/FactionSymbols";
import {useRootData} from "@/context/rootContext";

const RegistrationPage = () => {
  const { data, setData } = useRootData();

  const [callsign, setCallsign] = useState('')
  const [faction, setFaction] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const factions = FactionSymbols.enum

  const saveData = ( json:any ) => {
    setData(prevData => ({
      ...prevData,
      baseGameData: json
    }));
  };

  const handleSubmit = async () => {
    registration(callsign, faction)
      .then((response) => {
        return response.json()
      }).then((data) => {
      if (data.error) {
        if (data.error.data.faction) {
          setError(data.error.data.faction[0])
        } else if (data.error.data.symbol) {
          setError(data.error.data.symbol[0])
        } else {
          setError(data.error.message)
        }
      } else {
        setToken(data.data.token)
        localStorage.setItem('space_trader_token', data.data.token)
        saveData(data)
      }
    })
  }

  const handleFactionUpdate = (e: { target: { value: SetStateAction<string>; }; }) => {
    setFaction(e.target.value)
    setError('')
  }

  const handleCallsignUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCallsign(e.target.value)
    setError('')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Card sx={{ padding: 2, minWidth: 500 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Call Sign Registration
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: (theme) => theme.spacing(2),
            }}
          >
            <TextField
              label="Callsign"
              value={callsign}
              onChange={handleCallsignUpdate}
              inputProps={{ minLength: 2, maxLength: 14 }}
            />
            <Select label={'Faction'} value={faction} onChange={handleFactionUpdate}>
              {factions.map((faction) => (
                <MenuItem key={faction} value={faction}>
                  {faction}
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            {token && (
              <Typography variant="body1">
                Token: <code>{token}</code>
              </Typography>
            )}
            {error && (
              <Typography variant="body1" color={'error'}>
                Error: <code>{error}</code>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RegistrationPage