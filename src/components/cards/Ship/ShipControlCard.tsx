import {ShipNav, ShipRegistration} from "@/types/shipType";
import {Box, Button, Card, Divider} from "@mui/material";
import {dockShip, orbitShip, refuelShip} from "@/requests/ship";
import {WaypointNavigation} from "@/components/common/waypoint/waypointNavigation";
import {useRootData} from "@/context/rootContext";
import {ExtractionBlock} from "@/components/common/extractionBlock";

export interface ShipControlCardProps {
  registration: ShipRegistration
  nav: ShipNav
  setRefresh: (refresh: boolean) => void
}

export const ShipControlCard = ({registration, nav, setRefresh}: ShipControlCardProps) => {

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
      console.log(data)
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
      console.log(data)
      setRefresh(true)
    })
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
        { nav.status === 'IN_ORBIT' && <WaypointNavigation currentSystem={nav.waypointSymbol} registration={registration}/>}
        <Divider orientation={'vertical'} flexItem sx={{marginX: 1}}/>
        { nav.status === 'IN_ORBIT' && <ExtractionBlock name={registration.name} setRefresh={setRefresh}/>}

      </Box>
    </Card>
  )
}