export interface ShipType {
  type: string
}

export interface ShipLocation {
  symbol: string,
  type: string,
  systemSymbol: string,
  x: number,
  y: number
}

export interface ShipRoute {
  departure: ShipLocation
  destination: ShipLocation
  arrival: string
  departureTime: string
}

export interface ShipNav {
  systemSymbol: string,
  waypointSymbol: string,
  route: ShipRoute,
  status: string,
  flightMode: string
}

export interface ShipCrew {
  current: number,
  capacity: number,
  required: number,
  rotation: string,
  morale: number,
  wages: number
}

export interface ShipFuel {
  current: number,
  capacity: number,
  consumed: {
    amount: number,
    timestamp: Date
  }
}

export interface ShipFrame {
  symbol: string,
  name: string,
  description: string,
  moduleSlots: number,
  mountingPoints: number,
  fuelCapacity: number,
  condition: number,
  requirements: {
    power: number,
    crew: number
  }
}

export interface ShipReactor {
  symbol: string,
  name: string,
  description: string,
  condition: number,
  powerOutput: number,
  requirements: {
    crew: number
  }
}

export interface ShipEngine {
  symbol: string,
  name: string,
  description: string,
  condition: number,
  speed: number,
  requirements: {
    power: number,
    crew: number
  }
}

export interface ShipModule {
  symbol: string,
  name: string,
  description: string,
  capacity?: number,
  range?: number,
  requirements: {
    power: number,
    crew: number,
    slots: number
  }
}

export interface ShipMount {
  symbol: string,
  name: string,
  description: string,
  strength?: number,
  deposits?: string[],
  requirements: {
    power: number,
    crew: number
  }
}

export interface ShipRegistration {
  name: string,
  factionSymbol: string,
  role: string
}

export interface ShipCargo {
  capacity: number,
  units: number,
  inventory: any[]
}

export interface Ship {
  symbol: string
  nav: ShipNav
  crew: ShipCrew
  fuel: ShipFuel
  frame: ShipFrame
  reactor: ShipReactor
  engine: ShipEngine
  modules: ShipModule[]
  mounts: ShipMount[]
  registration: ShipRegistration
  cargo: ShipCargo
}