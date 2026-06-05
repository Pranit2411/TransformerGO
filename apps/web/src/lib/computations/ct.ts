export interface CTInputs {
  type: "Oil Cooled" | "Epoxy/Dry"
  burden: number
  voltageRating: number
  classType: string
  ctRatio: number
  stc: number
}

export interface CTOutputs {
  coreSize: { outerDiameter: number; internalDiameter: number; height: number }
  insulationOnCore: number
  crossSectionPrimary: number
  primaryTurns: number
  crossSectionSecondary: number
  secondaryTurns: number
  lengthOfPrimary: number
  insulationOnPrimary: number
}

export function computeCT(inputs: CTInputs): CTOutputs {
  const { burden, voltageRating, ctRatio } = inputs
  const a1 = ctRatio, a2 = 5
  const freq = 50, n2 = 60, currDensity = 1.0
  const stc = a1 / a2 >= 10 ? 26.3 : 13.1

  const vA = burden / a2
  const area = (4.44 * freq * n2 * currDensity) / vA
  const n1 = (a2 * n2) / a1
  const crossection = (stc * 1000) / 180
  const diameter = Math.sqrt((crossection * 4) / Math.PI)
  const insulation = 40
  const internalDiameter = insulation + diameter
  const height = 30
  const outerDiameter = (2 * area) / height + internalDiameter
  const copperCurrentDensity = 1.65

  const insulationOnPrimary =
    voltageRating === 11 ? 15 : voltageRating === 22 ? 30 : 40

  return {
    coreSize: {
      outerDiameter: Math.ceil(outerDiameter),
      internalDiameter: Math.ceil(internalDiameter),
      height: Math.ceil(height),
    },
    insulationOnCore: 4,
    crossSectionPrimary: Math.round((a1 / copperCurrentDensity) * 100) / 100,
    primaryTurns: n1,
    crossSectionSecondary: Math.round((a2 / copperCurrentDensity) * 100000) / 1000,
    secondaryTurns: n2,
    lengthOfPrimary: Math.round(((15 * (a1 / a2)) / 100) * 1000) / 100,
    insulationOnPrimary,
  }
}