import type { SelectValue } from '@/credit-application/models/select-value.type'

export enum Occupations {
  EMPLOYED = 'Angestellte/r',
  WORKER = 'Arbeiter/in',
  APPRENTICE = 'Auszubildende/r',
  GOVERNMENT_OFFICIAL = 'Beamte/r',
  FREELANCER = 'Freiberufler/in',
  VOLUNTARY_MILITARY_SERVICE = 'Freiwillig Wehrdienstleistende/r',
  VOLUNTARY_SOCIAL_YEAR = 'Freiwilliges Soziales Jahr',
  MANAGING_PARTNER = 'Geschäftsführende/r Gesellschafter/in',
  HOUSEWIFE = 'Hausfrau',
  HOUSEMAN = 'Hausmann',
  SENIOR_EXECUTIVE = 'Leitende/r Angestellte/r',
  UNEMPLOYED = 'Ohne Beschäftigung',
  PENSIONER = 'Pensionär/in',
  RETIREE = 'Rentner/in',
  SCHOOL_STUDENT = 'Schüler/in',
  SELF_EMPLOYED = 'Sonstiger Selbständige/r',
  OTHER = 'Sonstiges',
  STUDENT = 'Student/in'
}

export const getOccupationsAsSelectValueArray = (): Array<SelectValue> =>
  Object.entries(Occupations).map(
    ([key, value]): SelectValue => ({
      label: value,
      value: key
    })
  )
