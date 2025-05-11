import { SxProps } from "@mui/material"
import { TaskStatus } from "@/features/todolists/api/tasksApi.types.ts"

export const getListItemSx = (status: TaskStatus): SxProps => ({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "0",
  fontWeight: status === TaskStatus.Completed ? "normal" : "bold",
  // color: isDone ? 'grey' : 'black',
  opacity: status === TaskStatus.Completed ? "0.5" : "1",
})
