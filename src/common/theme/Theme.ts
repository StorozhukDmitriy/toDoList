import { createTheme } from "@mui/material"
import { ThemeMode } from "@/app/app-reducer.ts"

//На базе нашего объекта с темами создаём функцию на основании переданнного значения thememode.
//Которая нам возвращает объект с нашей темой
// Создается по аналогии, как мы создавали reducer без Redux
export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: "rgb(20,201,255)",
      },
    },
  })
}
