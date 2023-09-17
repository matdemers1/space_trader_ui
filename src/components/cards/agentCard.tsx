'use client'
import {useRootData} from "@/context/rootContext";
import {Box, Card, Divider, IconButton, Typography} from "@mui/material";
import {TextRow} from "@/components/common/textRow";
import RefreshIcon from '@mui/icons-material/Refresh';
import {getMyAgent} from "@/requests/myAgent";

interface AgentCardProps {
  simple?: boolean
}

export const AgentCard = ({simple}:AgentCardProps) => {
  const { data, setData } = useRootData();

  const refresh = () => {
    getMyAgent()
      .then((response) => {
        return response.json()
      }).then((data) => {
      if (data.error) {
        console.log(data.error.message)
      } else {
        setData(prevData => ({
          ...prevData,
          myAgent: data.data
        }));
      }
    })
  }

  return (
    <Card raised sx={{padding:2}}>
      {!simple &&
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
          <Typography variant="h5" component="h2">
            Agent
          </Typography>
          <IconButton onClick={refresh}>
            <RefreshIcon/>
          </IconButton>
        </Box>
      }
      <TextRow label={'Callsign'} value={data.myAgent?.symbol} />
      <Divider />
      <TextRow label={'Credits'} value={data.myAgent?.credits} />
      {!simple &&<Divider />}
      {!simple &&<TextRow label={'Headquarters'} value={data.myAgent?.headquarters} />}
      {!simple &&<Divider />}
      {!simple &&<TextRow label={'Faction'} value={data.myAgent?.startingFaction} />}
    </Card>
  )
}