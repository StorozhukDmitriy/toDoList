import { changeStatusModeAC, changeErrorAC } from "@/app/app-slice.ts"
import type { Dispatch } from "@reduxjs/toolkit"
import axios from "axios"

//Утилитная функция для обработки ошибки.
// unknown, any -для них делают функции тайпгварды
// const isNativeError = (error: unknown): error is number => {
//   return true
// }
//unknown - неизвестный тип, который подразумевает что мы сделаем для него проверку для типа, без этого не заработает.

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown) => {
  let errorMessage
  //Проверяем серверная это ошибка или нет.
  if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data?.message || error.message
    //Проверяем что это нативная ошибка
  } else if (error instanceof Error) {
    errorMessage = `Native error: ${error.message}`
  } else {
    errorMessage = JSON.stringify(error)
  }

  dispatch(changeErrorAC({ error: errorMessage }))
  dispatch(changeStatusModeAC({ status: "failed" }))
}
