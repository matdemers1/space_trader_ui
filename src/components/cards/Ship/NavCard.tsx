import {ShipNav} from "@/types/shipType";
import {Box, Card, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {DisplayBox} from "@/components/common/displayBox";

export interface NavCardProps {
  nav: ShipNav
}

export const NavCard = ({nav}: NavCardProps) => {
  return (
    <Card raised sx={{ padding:1 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" component="h2">
          Navigation:
        </Typography>
      </Box>
      <Divider sx={{marginX:1, marginBottom:2}}/>
      <Grid container spacing={1}>
        <DisplayBox label={'Flight Mode'} value={nav.flightMode}/>
        <DisplayBox label={'Status'} value={nav.status}/>
        <DisplayBox label={'System'} value={nav.systemSymbol}/>
        <DisplayBox label={'Waypoint'} value={nav.waypointSymbol}/>
      </Grid>
      {nav.route.departure.symbol !== nav.route.destination.symbol && (
        <Box>
          <Typography variant="h6" component="h2"> Flight: </Typography>
          <LinearProgress variant="determinate" value={1 / 1 * 100}/>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" component="h2"> Departure: {nav.route.departure.symbol} </Typography>
            <Typography variant="body1" component="h2"> Destination: {nav.route.destination.symbol} </Typography>
          </Box>
        </Box>
      )}
    </Card>
  )
}