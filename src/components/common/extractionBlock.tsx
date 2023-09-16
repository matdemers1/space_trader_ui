import {extractMineral} from "@/requests/ship";
import {useState} from "react";
import {Box, Button, Typography} from "@mui/material";

export interface ExtractionBlockProps {
  name: string
  setRefresh: (refresh: boolean) => void
}

export const ExtractionBlock = ({name, setRefresh}: ExtractionBlockProps) => {
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

  // If the cooldown is not zero every second subtract one from the cooldown
  if(cooldown !== 0){
    setTimeout(()=>{
      setCooldown(cooldown-1)
    }, 1000)
  }

  return (
    <Box>
      <Button
        size={'small'}
        sx={{m:1}}
        variant={'outlined'}
        disabled={cooldown !== 0}
        onClick={runShipExtraction}
      >
        {cooldown !== 0 ? `Cooldown: ${cooldown}` : 'Extract'}
      </Button>
    </Box>
  )
}