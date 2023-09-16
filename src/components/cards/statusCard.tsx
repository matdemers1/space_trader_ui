'use client'

import {useRootData} from "@/context/rootContext";
import {useEffect} from "react";
import {getStatus} from "@/requests/status";
import {Card, Divider, Typography} from "@mui/material";
import {TextRow} from "@/components/common/textRow";
import {formatDateShort} from "@/components/common/date";

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

  // Format a date like 2023-09-16T16:00:00.000Z to 2023-09-16 16:00:00 based on the eastern time zone using dayJS


  return (
    <Card raised sx={{padding:2}}>
      <Typography variant="h5" component="h2">
        Status
      </Typography>
      <TextRow label={data.status?.status} value={''} />
      <Divider />
      <TextRow label={'API version'} value={data.status?.version} />
      <Divider />
      <TextRow label={'Next Reset'} value={formatDateShort(data.status?.serverResets.next)} />
      <Divider />
      <TextRow label={'Reset Frequency'} value={data.status?.serverResets.frequency} />
    </Card>
  )
}