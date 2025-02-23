export class BaseParamsReq {
  page? = 1
  limit? = 20
}

export function ensureDefaultParams<T extends BaseParamsReq>(params: T): T {
  return {
    ...new BaseParamsReq(), // Esto establece los defaults
    ...params, // Sobrescribe con los valores proporcionados
  }
}
