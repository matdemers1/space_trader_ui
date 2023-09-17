import {ShipCargoItem} from "@/types/shipType";
import {Box, Button, Card, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {postSellItems} from "@/requests/market";

export interface CargoItemCardProps {
  cargoItem: ShipCargoItem
  shipName: string
  setRefresh: (refresh: boolean) => void
}

export const CargoItemCard = ({cargoItem, shipName, setRefresh}: CargoItemCardProps) => {
  const sellItem = async (quantity: number) => {
    postSellItems(shipName, cargoItem.symbol, quantity).then((res)=>{
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
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" component="h2">
          {cargoItem.name}
        </Typography>
        <Typography variant="body1" component="h2">
          Units: {cargoItem.units}
        </Typography>
      </Box>
      <Typography variant="body2" component="h2" color={grey[500]}>
        {cargoItem.description}
      </Typography>
      <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
        <Button variant={'outlined'} size={'small'} sx={{marginX:0.5}} onClick={()=>{sellItem(1)}}>
          Sell 1
        </Button>
        <Button variant={'outlined'} size={'small'} sx={{marginX:0.5}} onClick={()=>{sellItem(cargoItem.units)}}>
          Sell All
        </Button>
      </Box>
    </Card>
  )
}