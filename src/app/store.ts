import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "@/app/app-slice.ts"
import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { tasksReducer, tasksSlice } from "@/features/todolists/model/tasks-slice.ts"

// объединение reducer'ов с помощью combineReducers
//При использовании createSlice, combineReducer больше за ненадобностью.
// Все наши слайсы, мы переносим в store
// const rootReducer = combineReducers({
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   ThemeMode: appReducer,
// })

// создание store
//Вместо createStore теперь configureStore
export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
  },
})

// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
