import {ShipCargo, ShipNav, ShipRegistration} from "@/types/shipType";
import {Box, Button, Card, Divider} from "@mui/material";
import {dockShip, orbitShip, refuelShip} from "@/requests/ship";
import {WaypointNavigation} from "@/components/common/waypoint/waypointNavigation";
import {useRootData} from "@/context/rootContext";
import {ExtractionBlock} from "@/components/common/extractionBlock";
import {useState} from "react";
import {AutoSellBlock} from "@/components/common/AutoSellBlock";

export interface ShipControlCardProps {
  registration: ShipRegistration
  nav: ShipNav
  cargo: ShipCargo
  setRefresh: (refresh: boolean) => void
}

export const ShipControlCard = ({registration, nav, cargo, setRefresh}: ShipControlCardProps) => {
  const [autoMine, setAutoMine] = useState(false)
  const [autoSell, setAutoSell] = useState(false)

  const setShipToOrbit = () => {
    orbitShip(registration.name).then((res)=>{
      if(res.status===200){
        return res.json()
      } else {
        console.error(res)
      }
    }).then((data)=>{
      console.log(data)
      setRefresh(true)
    })
  }

  const setShipToDock = () => {
    dockShip(registration.name).then((res)=>{
      if(res.status===200){
        return res.json()
      } else {
        console.error(res)
      }
    }).then((data)=>{
      setRefresh(true)
    })
  }

  const refuelShipAction  = () => {
    refuelShip(registration.name).then((res)=>{
      if(res.status===200){
        return res.json()
      } else {
        console.error(res)
      }
    }).then((data)=>{
      setRefresh(true)
    })
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const commandRefresh = async () => {
    await delay(1000)
    if (autoSell && cargo.units === 0 && nav.status === 'DOCKED'){
      orbitShip(registration.name).then((res)=>{
        if(res.status===200){
          return res.json()
        } else {
          console.error(res)
        }
      })
    }
    if (autoMine && cargo.units === cargo.capacity && nav.status === 'IN_ORBIT'){
      dockShip(registration.name).then((res)=>{
        if(res.status===200){
          return res.json()
        } else {
          console.error(res)
        }
      })
    }
    await delay(1000)
    setRefresh(true)
  }

  return (
    <Card raised sx={{ padding:1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          {nav.status === 'DOCKED'
            ? (
              <Button
                size={'small'}
                variant={"outlined"}
                sx={{m:0.5}}
                onClick={() => {
                  setShipToOrbit()
                }}
              >
                Orbit
              </Button>
            ):(
              <Button
                size={'small'}
                variant={"outlined"}
                sx={{m:0.5}}
                onClick={() => {
                  setShipToDock()
                }}
              >
                Dock
              </Button>
            )}
          {nav.status === 'DOCKED' &&
            <Button
              sx={{m:0.5}}
              size={'small'}
              variant={"outlined"}
              onClick={()=>{refuelShipAction()}}
            >
              Refuel
            </Button>
          }
        </Box>
        <Divider orientation={'vertical'} flexItem sx={{marginX: 1}}/>
        <ExtractionBlock
            disabled={nav.status !== 'IN_ORBIT'}
            name={registration.name}
            setRefresh={commandRefresh}
            autoMine={autoMine}
            setAutoMine={setAutoMine}
        />
        <Divider orientation={'vertical'} flexItem sx={{marginX: 1}}/>
        <AutoSellBlock
            disabled={nav.status !== 'DOCKED'}
            registration={registration}
            setRefresh={commandRefresh}
            autoSell={autoSell}
            setAutoSell={setAutoSell}
            cargo={cargo}
        />
        { nav.status === 'IN_ORBIT' && <>
          <Divider orientation={'vertical'} flexItem sx={{marginX: 1}}/>
          <WaypointNavigation currentSystem={nav.waypointSymbol} registration={registration}/>
        </>}
      </Box>
    </Card>
  )
}