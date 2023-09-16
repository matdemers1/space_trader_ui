import {Box, Button, MenuItem, Select, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useEffect, useState} from "react";
import {getWaypoints} from "@/requests/systems";
import {useRootData} from "@/context/rootContext";
import {ShipRegistration} from "@/types/shipType";
import {navigateToSystem} from "@/requests/ship";

export interface WaypointNavigationProps {
  currentSystem: string
  registration: ShipRegistration
}

export const WaypointNavigation = ({currentSystem, registration}: WaypointNavigationProps) => {
  const { systemWaypoints, setSystemWaypoints } = useRootData()
  const [selectedWaypoint, setSelectedWaypoint] = useState<string>('')

  function toTitleCase(str: string) {
    return str.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  useEffect(() => {
    if (currentSystem && systemWaypoints.length === 0) {
      const system = currentSystem.substring(0, 7)
      getWaypoints(system, 1).then((response) => {
        response.json().then((json) => {
          setSystemWaypoints(json.data)
        });
      });
    }
  }, [currentSystem, setSystemWaypoints, systemWaypoints.length]);

  const navigateShip = () => {
    navigateToSystem(registration.name, selectedWaypoint)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          console.log('error')
        }
      }).then((data) => {
        setSelectedWaypoint('')
      })
  }

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant="body1" component="h2">
          {currentSystem.substring(8)}
        </Typography>
        <ArrowForwardIcon sx={{color:'yellow', marginX:1 }}/>
        <Select variant={'standard'} sx={{minWidth:130}} onChange={(e)=>{
          setSelectedWaypoint(e.target.value as string)
        }}>
          {systemWaypoints.map((waypoint, index)=>{
            return (
              <MenuItem key={index} value={waypoint.symbol}>
                {`${waypoint.symbol.substring(8)} (${toTitleCase(waypoint.type)})`}
              </MenuItem>
            )
          })}
        </Select>
      </Box>
      <Button variant={'outlined'} disabled={selectedWaypoint===''} size={'small'} fullWidth sx={{marginTop:1}} onClick={()=>{
        navigateShip()
      }}>
        Navigate
      </Button>
    </Box>
  )
}