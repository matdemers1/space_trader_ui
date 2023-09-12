import {Waypoint, WaypointIcons, WaypointTraits} from "@/types/waypoint";
import {Box, Card, Tooltip, Typography} from "@mui/material";

interface WaypointInfoCardProps {
  waypoint: Waypoint
}

export const WaypointInfoCard = ({waypoint}: WaypointInfoCardProps) => {
  return (
    <Card sx={{padding:1}}>
      <Typography variant={'body2'}>{waypoint.symbol}</Typography>
      <Typography variant={'body2'}>{waypoint.type}</Typography>
      <Box display="flex" justifyContent="space-between" flexDirection={'row'}>
        {waypoint.traits.map((trait: WaypointTraits) => {
          return (
            <Tooltip title={trait.name} key={trait.symbol}>
              <Box>
                {WaypointIcons(trait)}
              </Box>
            </Tooltip>
          )
        })}
      </Box>
    </Card>
  )
}