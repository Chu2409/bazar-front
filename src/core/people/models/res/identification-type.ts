export enum IdentificationType {
  DNI = 'DNI',
  PASSPORT = 'PASSPORT',
  RUC = 'RUC',
}

export const getIdentificationTypeLabel = (
  status: IdentificationType | string,
) => {
  const translations = {
    [IdentificationType.DNI]: 'Cédula',
    [IdentificationType.PASSPORT]: 'Pasaporte',
    [IdentificationType.RUC]: 'RUC',
  }
  return translations[status as IdentificationType]
}
