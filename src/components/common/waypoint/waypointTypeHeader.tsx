import {Box, Typography} from "@mui/material";

interface WaypointTypeHeaderProps {
  type: string
  length: number
}

export const WaypointTypeHeader = ({type, length}: WaypointTypeHeaderProps) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body1" component="h2">
      {type}
    </Typography>
    <Typography variant="body1" component="h2">
      {length}
    </Typography>
  </Box>
)