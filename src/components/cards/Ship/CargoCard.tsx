import {ShipCargo} from "@/types/shipType";
import {Box, Button, Card, Divider, LinearProgress, Typography} from "@mui/material";

export interface CargoCardProps {
  cargo: ShipCargo
}

export const CargoCard = ({cargo}: CargoCardProps) => {
  return (
    <Card raised sx={{ padding:1 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" component="h2">
          Cargo:
        </Typography>
        <Button variant={'outlined'} size={'small'}> View Inventory</Button>
      </Box>
      <Divider sx={{margin:1, marginBottom:2}}/>
      <Box>
        <LinearProgress variant="determinate" value={cargo.units / cargo.capacity * 100}/>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" component="h2"> Max: {cargo.capacity} </Typography>
          <Typography variant="body1" component="h2"> Current: {cargo.units} </Typography>
        </Box>
      </Box>
    </Card>
  )
}