import { createSlice } from "@reduxjs/toolkit"
export type ThemeMode = "dark" | "light"
// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")

// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })

//CreateSlice возвращает объект, обязательными свойствами которого являются name, initial state, reducers ( reducers получем через функцию в которую передаём (create)=>{объект}, синтаксис записи Название AC: create.reducer((state,action)=> и так далее )
export const appSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    themeMode: "light" as ThemeMode,
  },
  reducers: (create) => ({
    //Подредьюсер или экшен криейтор
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  //При помощи селекторов, мы достаём часть стейта.
  selectors: {
    selectTheme: (state) => state.themeMode,
  },
})
//При помощи диструктуризации достаём из слайса action and reducer.

export const { changeThemeModeAC } = appSlice.actions
export const appReducer = appSlice.reducer
export const ThemeMode = appSlice.selectors.selectTheme
