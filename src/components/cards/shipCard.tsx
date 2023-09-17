import {useEffect, useState} from "react";
import {getMyShips} from "@/requests/ship";
import {Ship} from "@/types/shipType";
import {Box, Card, Divider, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import { useRouter } from 'next/navigation'
import {useMyShipsColumnConfig} from "@/components/common/columnConfig/myShipColumnConfig";

export const MyShipsCard = () => {
  const router = useRouter()
  const columns = useMyShipsColumnConfig(router)
  const [ships, setShips] = useState<Ship[]>([])

  useEffect(() => {
    console.log('fetching')
    getMyShips().then((response) => {
      response.json().then((json) => {
        setShips(json.data)
      });
    });
  }, []);

  return (
    <>
      <Card raised sx={{ padding:1 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="h2">
            My Ships
          </Typography>
        </Box>
        <Divider sx={{marginBottom:1}}/>
        {ships.length > 0 && (
          <DataGrid columns={columns} rows={ships} getRowId={(params) => params.symbol}/>
        )}
      </Card>
    </>
  )
}