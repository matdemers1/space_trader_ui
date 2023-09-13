import {ShipCrew} from "@/types/shipType";
import {Box, Card, Divider, Grid, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {DisplayBox} from "@/components/common/displayBox";

export interface CrewCardProps {
  crew: ShipCrew
}

export const CrewCard = ({crew}: CrewCardProps) => {
  return (
    <Card raised sx={{ padding:1 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" component="h2">
          Crew:
        </Typography>
        <Typography variant="body1" component="h2" color={grey[500]}>
          {crew.rotation}
        </Typography>
      </Box>
      <Divider sx={{marginX:1, marginBottom:2}}/>
      <Grid container spacing={1}>
        <DisplayBox label={'Current'} value={`${crew.current} / ${crew.required}`}/>
        <DisplayBox label={'Capacity'} value={crew.capacity.toString()}/>
        <DisplayBox label={'Wages'} value={crew.wages.toString()}/>
        <DisplayBox label={'Morale'} value={crew.morale.toString()}/>
      </Grid>
    </Card>
  )
}