import { createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "@/common/types"

export type ThemeMode = "dark" | "light"
export const appSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    //Первое значение по умолчанию, а после as (воспринимай как тип)
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
  },
  reducers: (create) => ({
    //Подредьюсер или экшен криейтор
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    changeStatusModeAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    changeErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
  selectors: {
    selectTheme: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
})
export const { changeThemeModeAC, changeStatusModeAC, changeErrorAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const ThemeMode = appSlice.selectors.selectTheme
export const Status = appSlice.selectors.selectStatus
export const SelectError = appSlice.selectors.selectError
