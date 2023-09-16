import {ShipNav} from "@/types/shipType";
import {Box, Card, Divider, Grid, LinearProgress, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {DisplayBox} from "@/components/common/displayBox";
import dayjs from "dayjs";
import {formatDateLong, formatDateShort} from "@/components/common/date";
import {useEffect, useState} from "react";

export interface NavCardProps {
  nav: ShipNav
  setRefresh: (refresh: boolean) => void
}

export const NavCard = ({nav, setRefresh}: NavCardProps) => {
  const [progress, setProgress] = useState(0);

  const isArrivalInThePast = () => { return dayjs(nav.route.arrival).isBefore(dayjs())}

  const getDiffBetweenArrivalAndDeparture = () => {
    return dayjs(nav.route.arrival).diff(dayjs(nav.route.departureTime), 'second')
  }

  const getDiffBetweenArrivalAndNow = () => {
    return dayjs(nav.route.arrival).diff(dayjs(), 'second')
  }

  const getProgress = () => {
    return (getDiffBetweenArrivalAndNow() / getDiffBetweenArrivalAndDeparture()) * 100
  }
  //only update progress every second if (nav.route.departure.symbol !== nav.route.destination.symbol && !isArrivalInThePast())
  setInterval(() => {
    if (nav.route.departure.symbol !== nav.route.destination.symbol && !isArrivalInThePast()){
      setProgress(getProgress())
    } else if (isArrivalInThePast() && nav.status === 'IN_TRANSIT') {
      setProgress(0)
      setRefresh(true)
    }
  }, 1000)
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
      {(nav.route.departure.symbol !== nav.route.destination.symbol && !isArrivalInThePast()) && (
        <Box>
          <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="h2"> Flight: </Typography>
          <Typography variant="body1" component="h2"> Arrival: {formatDateLong(nav.route.arrival)} </Typography>
          </Box>
          <LinearProgress variant="determinate" value={100-progress}/>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" component="h2"> Departure: {nav.route.departure.symbol} </Typography>
            <Typography variant="body1" component="h2"> Destination: {nav.route.destination.symbol} </Typography>
          </Box>
        </Box>
      )}
    </Card>
  )
}