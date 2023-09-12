import {useEffect, useState} from "react";
import {getWaypoints} from "@/requests/systems";
import {useRootData} from "@/context/rootContext";
import {Box, Button, Card, Divider, Typography} from "@mui/material";
import {Waypoint} from "@/types/waypoint";
import {TreeItem, TreeView} from "@mui/x-tree-view"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {WaypointTypeHeader} from "@/components/common/waypoint/waypointTypeHeader";
import {WaypointHeader} from "@/components/common/waypoint/waypointHeader";
import {ShipyardModal} from "@/components/modals/shipyardModal";

export const WaypointsCard = () => {
  const { data } = useRootData()
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [shipyardSystem, setShipyardSystem] = useState<string>('');

  useEffect(() => {
    if (data.myAgent?.headquarters) {
      const system = data.myAgent?.headquarters.substring(0, 7)
      getWaypoints(system, 1).then((response) => {
        response.json().then((json) => {
          console.log(json.data)
          setWaypoints(json.data)
        });
      });
    }
  }, [data.myAgent?.headquarters]);

  const getWaypointTypes = (waypoints: Waypoint[]) => {
    const types: string[] = []
    waypoints.forEach((waypoint) => {
      if (!types.includes(waypoint.type)) {
        types.push(waypoint.type)
      }
    })
    return types
  }

  return (
    <>
      <Card raised sx={{ padding:1 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="h2">
            Waypoints
          </Typography>
          <Typography variant="h5" component="h2">
            {data.myAgent?.headquarters.substring(0, 7)}
          </Typography>
        </Box>
        <Divider sx={{marginBottom:1}}/>
        {waypoints.length>0&& (
          <>
            <Button
              variant="outlined"
              sx={{ marginRight:1 }}
              onClick={() => {
                const shipyardSystem = waypoints.find((waypoint) => waypoint.traits.find((trait) => trait.symbol === 'SHIPYARD'))
                if (shipyardSystem) {
                  setShipyardSystem(shipyardSystem.symbol)
                }
              }}
            >
              Shipyard
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const jumpGateSystem = waypoints.find((waypoint) => waypoint.type === 'JUMP_GATE')
                console.log(jumpGateSystem?.symbol)
              }}
            >
              Jump Gate
            </Button>
            <Divider sx={{marginY:1}}/>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              {getWaypointTypes(waypoints).map((type, index) => {
                const systems = waypoints.filter((waypoint) => waypoint.type === type)
                return (
                  <TreeItem key={index} nodeId={index.toString()} label={<WaypointTypeHeader type={type} length={systems.length}/>}>
                    {systems.map((waypoint, index2) => {
                      return (
                        <TreeItem key={index2} nodeId={index.toString()+'-'+index2.toString()} label={<WaypointHeader waypoint={waypoint} />}/>
                      )
                    })}
                  </TreeItem>
                )
               })}
            </TreeView>
          </>
        )}
      </Card>
      <ShipyardModal
        open={shipyardSystem!==''}
        onClose={()=> setShipyardSystem('')}
        systemSymbol={shipyardSystem.substring(0, 7)}
        waypointSymbol={shipyardSystem}
      />
    </>
  )
}