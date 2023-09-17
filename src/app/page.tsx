'use client'
import {useRootData} from "@/context/rootContext";
import {useEffect} from "react";
import {getMyAgent} from "@/requests/myAgent";
import {Card, Grid, Typography} from "@mui/material";
import {AgentCard} from "@/components/cards/agentCard";
import {StatusCard} from "@/components/cards/statusCard";
import {ContractsCard} from "@/components/cards/contractsCard";
import {WaypointsCard} from "@/components/cards/waypointsCard";
import {MyShipsCard} from "@/components/cards/shipCard";

export default function Home() {
  const {data, setData} = useRootData()

  useEffect(() => {
    if (!data.myAgent){
      getMyAgent()
        .then((response) => {
          return response.json()
        }).then((data) => {
        if (data.error) {
          //Todo add toast for error
          console.log(data.error.message)
        } else {
          setData(prevData => ({
            ...prevData,
            myAgent: data.data
          }));
        }
      })
    }
  }, []);

  return (
    <div>
      <main>
        <h1>Space Trader</h1>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={6}>
            <AgentCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StatusCard />
          </Grid>
          <Grid item xs={12}>
            <ContractsCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WaypointsCard />
          </Grid>
          <Grid item xs={12}>
            <MyShipsCard/>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
