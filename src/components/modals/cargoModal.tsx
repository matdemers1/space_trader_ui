import {ShipCargo} from "@/types/shipType";
import {Button, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import {CargoCard} from "@/components/cards/Ship/CargoCard";
import {useState} from "react";
import {CargoItemCard} from "@/components/cards/Ship/CargoItemCard";
import {getMarketData} from "@/requests/market";

export interface CargoModalProps {
  cargo: ShipCargo
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  systemSymbol: string
  waypointSymbol: string
}

export const CargoModal = ({ cargo, isOpen, setIsOpen, waypointSymbol, systemSymbol }: CargoModalProps) => {
  const fetchMarketData = async () => {
    getMarketData(systemSymbol, waypointSymbol).then((res)=>{
      if(res.status===200){
        return res.json()
      } else {
        console.error(res)
      }
    }).then((data)=>{
      console.log(data)
    })
  }
  return (
    <Dialog open={isOpen} onClose={()=>setIsOpen(false)} maxWidth={'md'} fullWidth>
      <DialogContent>
        <CargoCard cargo={cargo} disableInventory/>
        <Grid container spacing={2} padding={2}>
          {cargo.inventory.map((item, index)=>(
            <Grid item xs={12} sm={6} key={index}>
              <CargoItemCard cargoItem={item}/>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setIsOpen(false)}>Close</Button>
        <Button onClick={fetchMarketData}>Sell All</Button>
      </DialogActions>
    </Dialog>
  )
}