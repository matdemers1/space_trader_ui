import {ContractSimple} from "@/types/contract";
import {Button, Card, Typography} from "@mui/material";

interface AcceptedContractCardProps {
  contract: ContractSimple
  setModalContract?: (contract: ContractSimple | undefined) => void
}

export const AcceptedContractCard = ({ contract, setModalContract }: AcceptedContractCardProps) => {
  return (
    <Card sx={{padding: 1}}>
      <Typography variant={'body1'}>{contract.type}</Typography>
      <Typography variant={'body2'}><b>Open Till:</b> {contract.openTill.toString()}</Typography>
      <Typography variant={'body2'}><b>Expiration:</b> {contract.expiration.toString()}</Typography>
      { setModalContract && <Button onClick={()=>setModalContract(contract)}>View</Button> }
    </Card>
  )
}