import { AppBar, Box, Container, IconButton, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "../NavButton/NavButton.ts"
import { changeThemeModeAC } from "@/app/app-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTheme } from "@/common/theme/theme-selector.ts"
import { containerSx } from "@/common/components/Header/Header.styles.ts"

export const Header = () => {
  const themeMode = useAppSelector(selectTheme)
  const dispatch = useAppDispatch()
  const changeMode = () => {
    dispatch(changeThemeModeAC(themeMode === "light" ? { themeMode: "dark" } : { themeMode: "light" }))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box>
            <NavButton themeMode={themeMode}>Sign in</NavButton>
            <NavButton themeMode={themeMode}>Sign in</NavButton>
            <NavButton themeMode={themeMode}>faq</NavButton>
            <Switch onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
