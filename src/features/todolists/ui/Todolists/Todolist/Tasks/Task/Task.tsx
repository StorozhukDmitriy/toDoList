import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

import { Box, Checkbox, IconButton, ListItem } from "@mui/material"

import { EditSpan } from "@/common/components/EditSpan/EditSpan.tsx"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.styles.ts"
import { changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { TaskStatus } from "@/features/todolists/api/tasksApi.types.ts"
import { ChangeEvent } from "react"
import { RequestStatus } from "@/common/types"

type TaskProps = {
  id: string
  toDoListId: string
  status: TaskStatus
  title: string
  entityStatus: RequestStatus
}

export const Task = ({ id, toDoListId, status, title, entityStatus }: TaskProps) => {
  const dispatch = useAppDispatch()
  console.log(status)

  const deleteTaskHandler = () => {
    dispatch(deleteTaskTC({ taskId: id, todolistId: toDoListId }))
  }
  const AddNewTitleTask = (newTitle: string) => {
    dispatch(changeTaskTitleTC({ taskId: id, todolistId: toDoListId, title: newTitle }))
  }
  const ChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    console.log(status)
    dispatch(
      changeTaskStatusTC({
        taskId: id,
        todolistId: toDoListId,
        status: status,
      }),
    )
  }
  return (
    <ListItem
      sx={getListItemSx(status)}
      disablePadding
      key={id}
      className={status === TaskStatus.Completed ? "task-done" : "task"}
    >
      <Box>
        <Checkbox checked={status === TaskStatus.Completed} onChange={ChangeTaskStatus} />
        <EditSpan disable={entityStatus === "loading"} onBlur={AddNewTitleTask} title={title} />
      </Box>
      <IconButton style={{ marginRight: "10px" }} onClick={deleteTaskHandler} size={"small"}>
        <Delete color={"primary"} />
      </IconButton>
    </ListItem>
  )
}
