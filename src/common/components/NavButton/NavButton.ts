import { Button, styled } from "@mui/material"

type NavButtonProps = {
  themeMode?: string
}

//Тот случай когда нам необходим создать переиспользуемую несколько раз компоненту, которая может менять свой цвет в разных местах

export const NavButton = styled(Button)<NavButtonProps>(({ themeMode }) => ({
  minWidth: "100px",
  fontWeight: "500",
  border: "none",
  textTransform: "capitalize",
  margin: "0 10px",
  padding: "8px 24px",
  color: themeMode === "dark" ? "rgb(20,201,255)" : "black",
  // background: themeMode
}))
