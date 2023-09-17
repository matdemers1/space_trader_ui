import {ShipCargo, ShipRegistration} from "@/types/shipType";
import {Box, Button, Switch, Typography} from "@mui/material";
import {postSellItems} from "@/requests/market";
import {useRootData} from "@/context/rootContext";
import {useEffect} from "react";

export interface AutoSellBlockProps {
  registration: ShipRegistration
  setRefresh: (refresh: boolean) => void
  autoSell: boolean
  setAutoSell: (autoSell: boolean) => void
  cargo: ShipCargo
  disabled?: boolean
}

export const AutoSellBlock = ({registration, setRefresh, autoSell, setAutoSell, cargo, disabled}: AutoSellBlockProps) => {
  const {data, setData} = useRootData()
  console.log(data.myAgent.credits)

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runSellAll = async () => {
    for (const cargoItem of cargo.inventory) {
      try {
        const response = await postSellItems(registration.name, cargoItem.symbol, cargoItem.units);
        const data = await response.json();
        if (data.error) {
          console.error(data.error);
        } else {
          console.log(data);
          setData(prevData => ({
            ...prevData,
            myAgent: {
              ...prevData.myAgent,
              credits: data.data.agent.credits
            }
          }));
        }
        await delay(1000); // Wait for 5 seconds before next iteration
      } catch (error) {
        console.error("Error processing item:", error);
      }
    }
    setRefresh(true);
  }

  useEffect(() => {
    if (autoSell && cargo.inventory.length > 0 && !disabled) {
      runSellAll();
    }
  }, [autoSell, disabled]);

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
      <Button
        size={'small'}
        sx={{m:1}}
        variant={'outlined'}
        onClick={runSellAll}
        disabled={cargo.inventory.length === 0 || disabled}
      >
        Sell All
      </Button>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Switch defaultChecked={autoSell} onChange={()=>setAutoSell(!autoSell)}/>
        <Typography sx={{m:1}}>{'Auto'}</Typography>
      </Box>
    </Box>
  )
}