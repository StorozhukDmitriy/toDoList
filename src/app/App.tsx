import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Main } from "@/app/Main.tsx"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import { Header } from "@/common/components"
import { ThemeMode } from "@/app/app-slice.ts"

function App() {
  const themeMode = useAppSelector(ThemeMode)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
