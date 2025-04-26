import { EditSpan } from "@/common/components/EditSpan/EditSpan.tsx"
import { IconButton } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"

import { changeToDoListTitleTC, DeleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"

type TaskTitleProps = {
  title: string
  toDoListId: string
}

export const ToDoListTitle = ({ title, toDoListId }: TaskTitleProps) => {
  const dispatch = useAppDispatch()

  const changeToDoListTitle = (newTitle: string) => {
    dispatch(changeToDoListTitleTC({ id: toDoListId, title: newTitle }))
  }

  const deleteToDoList = (toDoListId: string) => {
    dispatch(DeleteTodolistAC({ id: toDoListId }))
  }

  return (
    <h3>
      <EditSpan title={title} onBlur={changeToDoListTitle} />
      <IconButton size={"small"} onClick={() => deleteToDoList(toDoListId)}>
        {" "}
        <DeleteForever color={"primary"} />
      </IconButton>
    </h3>
  )
}
