import {Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getAvailableShips, purchaseShip} from "@/requests/shipyard";
import {ShipType} from "@/types/shipType";

interface ShipyardModalProps {
  open: boolean
  onClose: () => void
  systemSymbol: string
  waypointSymbol: string
}

export const ShipyardModal = ({open, onClose, systemSymbol, waypointSymbol}: ShipyardModalProps) => {
  const [shipsAvailable, setShipsAvailable] = useState<ShipType[]>([])
  const [selectedShip, setSelectedShip] = useState<ShipType | null>(null)

  useEffect(() => {
    if (!open) {
      return
    } else if (systemSymbol || waypointSymbol) {
      getAvailableShips(systemSymbol, waypointSymbol)
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log(response)
          }
        })
        .then((data) => {
          console.log(data)
          setShipsAvailable(data.data.shipTypes)
        })
    }
  }, [open, systemSymbol, waypointSymbol]);

  return (
    <Dialog
      open={open}
      onClose={()=>{
        setSelectedShip(null)
        onClose()
      }}
      maxWidth={'md'}
      fullWidth={true}
    >
      <DialogTitle>Shipyard</DialogTitle>
      <DialogContent>
        <Typography variant={'body1'}>
          Ships available:
        </Typography>
        <Divider sx={{marginBottom:1}}/>
        <Grid container spacing={1} alignItems={'center'}>
          {shipsAvailable.map((ship, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Typography
                variant={'body1'}
                onClick={() => {
                  setSelectedShip(ship)
                }}
                sx={{
                  border: '1px solid',
                  borderColor: selectedShip?.type === ship.type ? 'primary.main' : 'grey.500',
                  color: selectedShip?.type === ship.type ? 'primary.main' : 'white',
                  borderRadius: 1,
                  padding: 1
                }}
              >
                {ship.type}
              </Typography>
            </Grid>
           ))}
        </Grid>
        <Divider sx={{marginY:1}}/>
        <Box display={'flex'} justifyContent={'end'}>
          <Button
            disabled={!selectedShip}
            variant={'outlined'}
            onClick={() => {
              if (!selectedShip) {
                return
              }
              purchaseShip(waypointSymbol, selectedShip.type || '')
                .then((response) => {
                  if (response.status === 200) {
                    return response.json()
                  } else {
                    console.log(response)
                  }
                })
                .then((data) => {
                  console.log(data)
                })
              setSelectedShip(null)
              onClose()
            }}
          >
            Purchase
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}