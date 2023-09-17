import {extractMineral} from "@/requests/ship";
import {useState} from "react";
import {Box, Button, Switch, Typography} from "@mui/material";

export interface ExtractionBlockProps {
  name: string
  setRefresh: (refresh: boolean) => void
}

export const ExtractionBlock = ({name, setRefresh}: ExtractionBlockProps) => {
  const [cooldown, setCooldown] = useState<number>(0)
  const [auto, setAuto] = useState<boolean>(false)

  const runShipExtraction = () => {
    extractMineral(name).then((res)=>{
      return res.json()
    }).then((data)=>{
      if (data.error){
        console.error(data.error)
      } else {
        console.log(data)
        setCooldown(data.data.cooldown.totalSeconds)
        setRefresh(true)
      }
    })
  }

  if(cooldown !== 0){
    setTimeout(()=>{
      setCooldown(cooldown-1)
      if (auto && cooldown === 1){
        runShipExtraction()
      }
    }, 1000)
  }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <Button
        size={'small'}
        sx={{m:1}}
        variant={'outlined'}
        disabled={cooldown !== 0}
        onClick={runShipExtraction}
      >
        {cooldown !== 0 ? `Cooldown: ${cooldown}` : 'Extract'}
      </Button>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Switch value={auto} onChange={()=>setAuto(!auto)}/>
        <Typography sx={{m:1}}>{'Auto'}</Typography>
      </Box>
    </Box>
  )
}