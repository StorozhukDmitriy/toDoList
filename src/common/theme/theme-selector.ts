import { RootState } from "../../app/store.ts"
import { ThemeMode } from "../../app/app-reducer.ts"
//Проще говоря селектор это функция к получению части нашего стейта. Для чего кастомный хук useAppSelector/dispatch читай в тех компонентах
export const selectTheme = (state: RootState): ThemeMode => state.ThemeMode.themeMode
