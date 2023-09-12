import {ContractSimple} from "@/types/contract";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import {acceptContract} from "@/requests/contracts";
import {useRootData} from "@/context/rootContext";

interface ContractModalProps {
  modalContract: ContractSimple
  setModalContract: (contract: ContractSimple | undefined) => void
  contracts?: ContractSimple[]
  updateContracts?: (contracts: ContractSimple[]) => void
}

export const ContractModal = ({ modalContract, setModalContract, contracts, updateContracts }: ContractModalProps) => {
  const {acceptedContracts, setAcceptedContracts} = useRootData()

  const acceptNewContract = () => {
    acceptContract(modalContract.id).then(
      (response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          console.log(response)
        }
    }).then((data) => {
      console.log(data)
      setAcceptedContracts([...acceptedContracts, data.contract])
      if(updateContracts && contracts) {
        updateContracts(contracts.filter((contract: ContractSimple) => contract.id !== data.contract.id))
      }
    })
  }

  return (
    <Dialog
      maxWidth={'md'}
      fullWidth={true}
      open={modalContract !== undefined}
      onClose={()=>setModalContract(undefined)}
    >
      <DialogTitle sx={{ display:'flex', flexDirection: 'row'}}>
        <Typography variant={'h5'}>
          {`Contract: ${modalContract.id}`}
        </Typography>
        <Box flexGrow={1}/>
        <Typography color={modalContract.accepted ? 'green' : 'red'} variant={'h6'}>
          {modalContract.accepted ? 'Accepted' : 'Pending'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant={'body1'}><b>Type:</b> {modalContract.type}</Typography>
        <Typography variant={'body1'}><b>Open Till:</b> {modalContract.openTill.toString()}</Typography>
        <Typography variant={'body1'}><b>Expiration:</b> {modalContract.expiration.toString()}</Typography>
        <Typography variant={'body1'}><b>On Accepted:</b> {modalContract.onAccepted}</Typography>
        <Typography variant={'body1'}><b>On Fulfilled:</b> {modalContract.onFulfilled}</Typography>
        <Divider sx={{margin: 2}}/>
        <Typography variant={'h6'}>Deliverables</Typography>
        <Grid container spacing={1}>
          {modalContract.deliverables.map((deliverable: any, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card raised={true} sx={{padding:2}}>
                <Typography variant={'body1'}><b>Destination:</b> {deliverable.destination}</Typography>
                <Typography variant={'body1'}><b>Trade Symbol:</b> {deliverable.tradeSymbol}</Typography>
                <Typography variant={'body1'}><b>Units Fulfilled:</b> {deliverable.unitsFulfilled} / {deliverable.unitsRequired}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        { !modalContract.accepted && (
          <Button
            onClick={() => {
              acceptNewContract()
              setModalContract(undefined)
            }}
          >
            Accept
          </Button>
        )}
        <Button onClick={()=>setModalContract(undefined)}>Close</Button>
      </DialogActions>
    </Dialog>
  )

}