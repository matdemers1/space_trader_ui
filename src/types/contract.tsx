export interface ContractDeliverable {
  destination: string,
  tradeSymbol: string,
  unitsFulfilled: number,
  unitsRequired: number,
}

export interface ContractSimple {
  id: string,
  type: string,
  openTill: Date,
  expiration: Date,
  onAccepted: number,
  onFulfilled: number,
  accepted: boolean,
  deliverables: ContractDeliverable[]
}