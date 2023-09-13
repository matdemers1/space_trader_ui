import {ShipFuel, ShipRegistration} from "@/types/shipType";
import {Box, Card, Divider, LinearProgress, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

export interface ShipHeaderProps {
  shipRegistration: ShipRegistration
  shipFuel: ShipFuel
}

export const ShipHeader = ({shipRegistration, shipFuel}: ShipHeaderProps) => {
  return (
    <Card raised={true} sx={{padding: 1}}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" component="h2">
          {shipRegistration.name}
        </Typography>
        <Typography variant="h5" component="h2" color={grey[500]}>
          <i>{shipRegistration.role}</i>
        </Typography>
      </Box>
      <Divider sx={{margin: 1, marginBottom:2}}/>
      <Box>
        <Typography variant="h6" component="h2"> Fuel: </Typography>
        <LinearProgress variant="determinate" value={shipFuel.current / shipFuel.capacity * 100}/>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body1" component="h2"> Max: {shipFuel.capacity} </Typography>
          <Typography variant="body1" component="h2"> Current: {shipFuel.current} </Typography>
        </Box>
      </Box>
    </Card>
  )
}