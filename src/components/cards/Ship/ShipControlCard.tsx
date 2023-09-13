import {ShipNav, ShipRegistration} from "@/types/shipType";
import {Button, Card} from "@mui/material";
import {dockShip, orbitShip} from "@/requests/ship";

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

  return (
    <Card raised sx={{ padding:1 }}>
      {nav.status === 'DOCKED'
        ? (
          <Button
            size={'small'}
            variant={"outlined"}
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
            onClick={() => {
              setShipToDock()
            }}
          >
            Dock
          </Button>
        )}
    </Card>
  )
}