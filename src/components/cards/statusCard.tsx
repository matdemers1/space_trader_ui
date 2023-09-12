'use client'

import {useRootData} from "@/context/rootContext";
import {useEffect} from "react";
import {getStatus} from "@/requests/status";
import {Card, Divider, Typography} from "@mui/material";
import {TextRow} from "@/components/common/textRow";

export const StatusCard = () => {
  const token = localStorage.getItem('space_trader_token')
  const {data, setData} = useRootData()

  useEffect(() => {
    if (!data.status){
      if (token) {
        getStatus(token)
          .then((response) => {
            return response.json()
          }).then((data) => {
          if (data.error) {
            //Todo add toast for error
            console.log(data.error.message)
          } else {
            setData(prevData => ({
              ...prevData,
              status: data
            }));
          }
        })
      }
    }
  }, [data.status]);

  console.log(data.status)

  return (
    <Card raised sx={{padding:2}}>
      <Typography variant="h5" component="h2">
        Status
      </Typography>
      <TextRow label={data.status?.status} value={''} />
      <Divider />
      <TextRow label={'API version'} value={data.status?.version} />
      <Divider />
      <TextRow label={'Next Reset'} value={data.status?.serverResets.next} />
      <Divider />
      <TextRow label={'Reset Frequency'} value={data.status?.serverResets.frequency} />
    </Card>
  )
}