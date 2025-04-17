import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Main } from "@/app/Main.tsx"
import { useAppSelector } from "@/common/hooks"
import { getTheme, selectTheme } from "@/common/theme"
import { Header } from "@/common/components"

function App() {
  const ThemeMode = useAppSelector(selectTheme)
  const theme = getTheme(ThemeMode)

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
