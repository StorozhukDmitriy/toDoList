import { SxProps } from "@mui/material"

export const getListItemSx = (isDone: boolean): SxProps => ({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "0",
  fontWeight: isDone ? "normal" : "bold",
  // color: isDone ? 'grey' : 'black',
  opacity: isDone ? "0.5" : "1",
})
