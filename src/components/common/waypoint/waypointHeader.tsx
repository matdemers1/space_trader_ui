import {Box, Tooltip, Typography} from "@mui/material";
import {Waypoint, WaypointIcons, WaypointTraits} from "@/types/waypoint";

interface WaypointHeaderProps {
  waypoint: Waypoint
}

export const WaypointHeader = ({waypoint}: WaypointHeaderProps) => {
  return (
    <Box display="flex" justifyContent="space-between" flexDirection={'row'}>
      <Typography variant={'body2'}>{waypoint.symbol}</Typography>
      <Box display="flex" flexDirection={'row'}>
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
    </Box>
  )
}