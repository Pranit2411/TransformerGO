export interface PTInputs {
  burden: number
  voltageRating: number
  classType: string
  stc: number
}

export interface PTOutputs {
  crossSectionArea: number
  wireWidth: number
  insulationLayers: number
  primaryTurns: number
  secondaryTurns: number
}

export function computePT(inputs: PTInputs): PTOutputs {
  const { burden, voltageRating } = inputs
  const freq = 50
  const fluxDensity = 1.4
  const primaryVoltage = voltageRating * 1000
  const secondaryVoltage = 110

  const primaryTurns = Math.ceil(primaryVoltage / (4.44 * freq * fluxDensity * 0.001))
  const secondaryTurns = Math.ceil(secondaryVoltage / (4.44 * freq * fluxDensity * 0.001))
  const crossSectionArea = burden / (secondaryVoltage * secondaryVoltage) * 1e6
  const wireWidth = Math.sqrt(crossSectionArea / Math.PI) * 2
  const insulationLayers = voltageRating === 11 ? 4 : voltageRating === 22 ? 8 : 12

  return {
    crossSectionArea: Math.round(crossSectionArea * 100) / 100,
    wireWidth: Math.round(wireWidth * 100) / 100,
    insulationLayers,
    primaryTurns,
    secondaryTurns,
  }
}