export type FieldError = { error: string; field: string }

//Если типы схожи, но отличаются 1 параметром, можно отдельный (изменяемый тип) сделать через дженерики, как сделано ниже.
// Можно указать базовое значение дженерика <D = string>
export type BaseResponse<D> = {
  data: D
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}
