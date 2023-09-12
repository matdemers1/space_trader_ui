'use client'
import {useRootData} from "@/context/rootContext";
import {Card, Divider, Typography} from "@mui/material";
import {TextRow} from "@/components/common/textRow";

export const AgentCard = () => {
  const { data } = useRootData();

  return (
    <Card raised sx={{padding:2}}>
      <Typography variant="h5" component="h2">
        My Agent
      </Typography>
      <TextRow label={'Callsign'} value={data.myAgent?.symbol} />
      <Divider />
      <TextRow label={'Credits'} value={data.myAgent?.credits} />
      <Divider />
      <TextRow label={'Headquarters'} value={data.myAgent?.headquarters} />
      <Divider />
      <TextRow label={'Faction'} value={data.myAgent?.startingFaction} />
    </Card>
  )
}