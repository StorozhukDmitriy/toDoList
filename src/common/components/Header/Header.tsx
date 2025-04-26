import { AppBar, Box, Container, IconButton, Switch, Toolbar } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"

import { containerSx } from "@/common/components/Header/Header.styles.ts"
import { changeThemeModeAC, ThemeMode } from "@/app/app-slice.ts"
import { NavButton } from "@/common/components"

export const Header = () => {
  const themeMode = useAppSelector(ThemeMode)
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
