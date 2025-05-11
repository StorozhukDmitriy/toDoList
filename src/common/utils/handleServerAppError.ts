import { changeErrorAC, changeStatusModeAC } from "@/app/app-slice"
import type { BaseResponse } from "@/common/types"
import type { Dispatch } from "@reduxjs/toolkit"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  //const dispatch = useAppDispatch()- Хуки можно использовать только внутри компоненты или кастомных хуков, поэтому в утилитную функцию сможем передать dispatch только в параметрах.
  if (data.messages.length) {
    dispatch(changeErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(changeErrorAC({ error: "Some error occurred" }))
  }
  dispatch(changeStatusModeAC({ status: "failed" }))
}
