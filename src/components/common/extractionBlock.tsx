import {extractMineral} from "@/requests/ship";
import {useState} from "react";
import {Box, Button, Switch, Typography} from "@mui/material";

export interface ExtractionBlockProps {
  name: string
  setRefresh: (refresh: boolean) => void
  autoMine: boolean
  setAutoMine: (autoMine: boolean) => void
  disabled?: boolean
}

export const ExtractionBlock = ({name, setRefresh, autoMine, setAutoMine, disabled}: ExtractionBlockProps) => {
  const [cooldown, setCooldown] = useState<number>(0)

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

  if(cooldown !== 0 && autoMine && !disabled){
    setTimeout(()=>{
      if (autoMine && cooldown === 1){
        runShipExtraction()
      } else {
        setCooldown(cooldown-1)
      }
    }, 1000)
  }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <Button
        size={'small'}
        sx={{m:1}}
        variant={'outlined'}
        disabled={cooldown !== 0 || disabled}
        onClick={runShipExtraction}
      >
        {cooldown !== 0 ? `Cooldown: ${cooldown}` : 'Extract'}
      </Button>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Switch defaultChecked={autoMine} onChange={()=>setAutoMine(!autoMine)}/>
        <Typography sx={{m:1}}>{'Auto'}</Typography>
      </Box>
    </Box>
  )
}