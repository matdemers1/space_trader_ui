import {useEffect, useState} from "react";
import {getContracts} from "@/requests/contracts";
import {
  Button,
  Card,
  Divider, Grid,
  Typography
} from "@mui/material";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {ContractSimple} from "@/types/contract";
import {ContractModal} from "@/components/modals/contractModal";
import {useRootData} from "@/context/rootContext";
import {AcceptedContractCard} from "@/components/cards/acceptedContractCard";



export const ContractsCard = () => {
  const token = localStorage.getItem('space_trader_token')
  const {acceptedContracts, setAcceptedContracts} = useRootData()
  const [contracts, setContracts] = useState<ContractSimple[]>([])
  const [modalContract, setModalContract] = useState<ContractSimple | undefined>(undefined)

  const columns: GridColDef[] = [
    { field: 'id', headerName: '', width: 80, renderCell: (params) => {
      const contract = contracts.find((contract: any) => contract.id === params.value)
        return (
          <Button size={'small'} onClick={()=>setModalContract(contract)}>View</Button>
        )
      }
    },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'openTill', headerName: 'Open Till', width: 160 },
    { field: 'expiration', headerName: 'Expiration', width: 160 },
    { field: 'onAccepted', headerName: 'On Accepted', width: 130 },
    { field: 'onFulfilled', headerName: 'On Fufillment', width: 130 },
  ]

  // adds contract to state if it doesn't exist in the accepted contracts key
  const updateAcceptedContracts = (contract: ContractSimple) => {
    if (!acceptedContracts.find((acceptedContract: ContractSimple) => acceptedContract.id === contract.id)) {
      setAcceptedContracts([...acceptedContracts, contract])
    }
  }

  useEffect(() => {
    if (token) {
      getContracts().then(
        (response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log(response)
          }
        }).then((data) => {
          if (data.error) {
            //Todo add toast for error
            console.log(data.error.message)
          } else {
            console.log(data.data)
            data.data.filter((contract: any)=>{
              return contract.accepted === true
            }).map((contract: any) => {
              return {
                id: contract.id,
                type: contract.type,
                openTill: contract.deadlineToAccept,
                expiration: contract.terms.deadline,
                onAccepted: contract.terms.payment.onAccepted,
                onFulfilled: contract.terms.payment.onFulfilled,
                accepted: contract.accepted,
                deliverables: contract.terms.deliver.map((deliverable: any) => {
                  return {
                    destination: deliverable.destinationSymbol,
                    tradeSymbol: deliverable.tradeSymbol,
                    unitsFulfilled: deliverable.unitsFulfilled,
                    unitsRequired: deliverable.unitsRequired,
                  }
                })
              } as ContractSimple
            }).forEach((contract: ContractSimple) => {
              updateAcceptedContracts(contract)
            })
            setContracts(data.data
              .filter((contract: any)=>{
                return contract.accepted === false
              })
              .map((contract: any) => {
                return {
                  id: contract.id,
                  type: contract.type,
                  openTill: contract.deadlineToAccept,
                  expiration: contract.terms.deadline,
                  onAccepted: contract.terms.payment.onAccepted,
                  onFulfilled: contract.terms.payment.onFulfilled,
                  accepted: contract.accepted,
                  deliverables: contract.terms.deliver.map((deliverable: any) => {
                    return {
                      destination: deliverable.destinationSymbol,
                      tradeSymbol: deliverable.tradeSymbol,
                      unitsFulfilled: deliverable.unitsFulfilled,
                      unitsRequired: deliverable.unitsRequired,
                    }
                  })
                } as ContractSimple
            }))
          }
        }
      )
    }
  }, []);

  return (
    <>
      <Card raised sx={{padding:2}}>
        <Typography variant="h5" component="h2">
          Contracts
        </Typography>
        <Divider sx={{marginBottom:2}}/>
        { acceptedContracts.length > 0 && (
          <>
            <Typography variant="h6" component="h2">
              Accepted Contracts
            </Typography>
            <Grid container spacing={1}>
              {acceptedContracts.map((contract: ContractSimple, index: number) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <AcceptedContractCard contract={contract} setModalContract={setModalContract} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Typography variant="h6" component="h2">
          Available Contracts
        </Typography>
        {contracts.length > 0 && (
          <DataGrid columns={columns} rows={contracts} rowSelection={false} />
        )}
      </Card>
      { modalContract && (
        <ContractModal modalContract={modalContract} setModalContract={setModalContract} contracts={contracts} updateContracts={setContracts} />
      )}
    </>
  )
}