import {ShipCargoItem} from "@/types/shipType";
import {Box, Card, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";

export interface CargoItemCardProps {
  cargoItem: ShipCargoItem
}

export const CargoItemCard = ({cargoItem}: CargoItemCardProps) => {
  return (
    <Card raised sx={{ padding:1 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h6" component="h2">
          {cargoItem.name}
        </Typography>
        <Typography variant="body1" component="h2">
          Units: {cargoItem.units}
        </Typography>
      </Box>
      <Typography variant="body2" component="h2" color={grey[500]}>
        {cargoItem.description}
      </Typography>
    </Card>
  )
}