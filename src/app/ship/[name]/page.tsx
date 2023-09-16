'use client'
import {usePathname} from "next/navigation";
import {Ship} from "@/types/shipType";
import {useEffect, useState} from "react";
import {getShip} from "@/requests/ship";
import {Grid} from "@mui/material";
import {ShipHeader} from "@/components/cards/Ship/ShipHeader";
import {CrewCard} from "@/components/cards/Ship/CrewCard";
import {CargoCard} from "@/components/cards/Ship/CargoCard";
import {ShipControlCard} from "@/components/cards/Ship/ShipControlCard";
import {NavCard} from "@/components/cards/Ship/NavCard";
import {CargoModal} from "@/components/modals/cargoModal";

export default function ShipPage() {
  const pathname = usePathname()
  const [ship, setShip] = useState<Ship | undefined>(undefined)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [showInventory, setShowInventory] = useState<boolean>(false)

  useEffect(() => {
    if(!ship || refresh){
      const shipSymbol = pathname.substring(6)
      getShip(shipSymbol).then((res)=>{
        if(res.status===200){
          return res.json()
        } else {
          console.error(res)
        }
      }).then((data)=>{
        setShip(data.data)
        setRefresh(false)
      })
    }
  }, [ship, refresh, pathname]);

  if (!ship) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <main>
        <h1>Space Trader</h1>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12}>
            <ShipHeader shipRegistration={ship?.registration} shipFuel={ship?.fuel}/>
          </Grid>
          <Grid item xs={12}>
            <NavCard nav={ship.nav} setRefresh={setRefresh}/>
          </Grid>
          <Grid item xs={12}>
            <ShipControlCard registration={ship.registration} nav={ship.nav} setRefresh={setRefresh}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CrewCard crew={ship?.crew}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CargoCard cargo={ship?.cargo} showInventory={setShowInventory}/>
          </Grid>
        </Grid>
        <CargoModal
          cargo={ship.cargo}
          isOpen={showInventory}
          setIsOpen={setShowInventory}
          systemSymbol={ship.nav.systemSymbol}
          waypointSymbol={ship.nav.waypointSymbol}
        />
      </main>
    </div>
  )
}