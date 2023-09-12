'use client'

import {Box, Typography} from "@mui/material";
import {blue} from "@mui/material/colors";

interface TextRowProps {
  label: string,
  value: any
}

export const TextRow = ({label, value}: TextRowProps) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant={'body1'} sx={{color: blue[400], fontWeight: 400}}>
        <b>{label}</b>
      </Typography>
      <Typography variant={'body1'}>
        {value}
      </Typography>
    </Box>
  )
}