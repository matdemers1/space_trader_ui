export interface WaypointChart {
  submittedBy: string
  submittedOn: string;
}

export interface WaypointFaction {
  symbol: string
}

export interface WaypointOrbitalItem {
  symbol: string
}

export interface WaypointTraits {
  symbol: string
  name: string
  description: string
}

export interface Waypoint {
  symbol: string
  systemSymbol: string
  type: string
  x: number
  y: number
  chart: WaypointChart
  faction: WaypointFaction
  orbitals: WaypointOrbitalItem[]
  traits: WaypointTraits[]
}

export const WaypointIcons = (trait: WaypointTraits) => {
  switch (trait.symbol) {
    case "VIBRANT_AURORAS":
      return "🌌"
    case "TOXIC_ATMOSPHERE":
      return "☣️"
    case "VOLCANIC":
      return "🌋"
    case "WEAK_GRAVITY":
      return "🪐"
    case "OVERCROWDED":
      return "👥"
    case "HIGH_TECH":
      return "🤖"
    case "BUREAUCRATIC":
      return "📝"
    case "TEMPERATE":
      return "🌡️"
    case "MARKETPLACE":
      return "🏪"
    case "BARREN":
      return "🏜️"
    case "FROZEN":
      return "❄️"
    case "MINERAL_DEPOSITS":
      return "⛏️"
    case "COMMON_METAL_DEPOSITS":
      return "⛏️"
    case "STRIPPED":
      return "🌑"
    case "STRONG_MAGNETOSPHERE":
      return "🧲"
    case "MILITARY_BASE":
      return "🪖"
    case "SHIPYARD":
      return "🚀"
    case "DRY_SEABEDS":
      return "🌊"
    default:
      console.log(trait.symbol)
      return "❌"
  }
}