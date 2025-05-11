import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { changeErrorAC, SelectError } from "@/app/app-slice.ts"

export const ErrorSnackbar = () => {
  const error = useAppSelector(SelectError)
  const dispatch = useAppDispatch()
  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    //В AC и ТС передаём объекты !!!!!
    dispatch(changeErrorAC({ error: null }))
  }
  //!!error === Boolean(error) как вариант записи.
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={!!error}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
