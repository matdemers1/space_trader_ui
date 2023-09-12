export const Faction = {
  "description": "Faction details.",
  "type": "object",
  "properties": {
    "symbol": {
      "$ref": "./FactionSymbols.tsx",
      "description": "Faction symbol."
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Name of the faction."
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "description": "Description of the faction."
    },
    "headquarters": {
      "type": "string",
      "minLength": 1,
      "description": "The waypoint in which the faction's HQ is located in."
    },
    "traits": {
      "type": "array",
      "description": "List of traits that define this faction.",
      "items": {
        "$ref": "./FactionTrait.json"
      }
    },
    "isRecruiting": {
      "type": "boolean",
      "description": "Whether or not the faction is currently recruiting new agents."
    }
  },
  "required": [
    "symbol",
    "name",
    "description",
    "headquarters",
    "traits",
    "isRecruiting"
  ]
}