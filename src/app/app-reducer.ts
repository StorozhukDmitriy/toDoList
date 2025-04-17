import { createAction, createReducer } from "@reduxjs/toolkit"

const initialState = {
  //as ThemeMode используется для того что бы явно обозначить типизацию свойства themeMode. Если явно не указать, то тип будет string.
  themeMode: "light" as ThemeMode,
}
export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

export const appReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeThemeModeAC, (state, action) => {
    state.themeMode = action.payload.themeMode
  })
})

export type ThemeMode = "dark" | "light"
