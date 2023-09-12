import {Button} from "@mui/material";
import {useMemo} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

export const useMyShipsColumnConfig = (router:AppRouterInstance) => {
  return  useMemo(() => [
    { field: 'view', headerName: '', width: 80, renderCell: (params: any) => (
        <Button
          variant="text"
          onClick={() => {
            router.push(`/ship/${params.row.symbol}`)
          }}
        >
          View
        </Button>
      )},
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    { field: 'role', headerName: 'Role', width: 150, valueGetter: (params: any) => params.row.registration.role},
    { field: 'location', headerName: 'Location', width: 100, valueGetter: (params: any) => params.row.nav.systemSymbol},
    { field: 'waypoint', headerName: 'Waypoint', width: 100, valueGetter: (params: any) => params.row.nav.waypointSymbol.substring(8)},
    { field: 'status', headerName: 'Status', width: 100, valueGetter: (params: any) => params.row.nav.status},
    { field: 'flightMode', headerName: 'Flight Mode', width: 100, valueGetter: (params: any) => params.row.nav.flightMode},
  ]
  , [])
}