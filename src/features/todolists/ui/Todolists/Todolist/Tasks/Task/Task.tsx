import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/todolists/model/tasks-reducer.ts"
import { Box, Checkbox, IconButton, ListItem } from "@mui/material"

import { EditSpan } from "@/common/components/EditSpan/EditSpan.tsx"
import { Delete } from "@mui/icons-material"
import { getListItemSx } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.styles.ts"

type TaskProps = {
  id: string
  toDoListId: string
  isDone: boolean
  title: string
}

export const Task = ({ id, toDoListId, isDone, title }: TaskProps) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({ taskId: id, todolistId: toDoListId }))
  }
  const AddNewTitleTask = (newTitle: string) => {
    dispatch(changeTaskTitleAC({ taskId: id, todolistId: toDoListId, title: newTitle }))
  }
  return (
    <ListItem sx={getListItemSx(isDone)} disablePadding key={id} className={isDone ? "task-done" : "task"}>
      <Box>
        <Checkbox
          checked={isDone}
          onChange={(e) =>
            dispatch(
              changeTaskStatusAC({
                taskId: id,
                todolistId: toDoListId,
                isDone: e.currentTarget.checked,
              }),
            )
          }
        />
        <EditSpan onBlur={AddNewTitleTask} title={title} />
      </Box>
      <IconButton style={{ marginRight: "10px" }} onClick={deleteTaskHandler} size={"small"}>
        <Delete color={"primary"} />
      </IconButton>
    </ListItem>
  )
}
