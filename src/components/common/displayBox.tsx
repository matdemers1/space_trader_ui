import {Box, Grid, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";

export const DisplayBox = ({label, value}: { label: string, value: string }) => {
  return (
    <Grid item xs={6} sm={6} md={3}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Typography variant="body1" component="h2" color={blue[500]}>
          {label}
        </Typography>
        <Typography variant="body1" component="h2">
          {value}
        </Typography>
      </Box>
    </Grid>
  )
}