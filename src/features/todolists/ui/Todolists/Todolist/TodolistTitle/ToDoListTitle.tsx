import { EditSpan } from "@/common/components/EditSpan/EditSpan.tsx"
import { IconButton } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"
import { changeToDoListTitleAC, DeleteTodolistAC } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type TaskTitleProps = {
  title: string
  toDoListId: string
}

export const ToDoListTitle = ({ title, toDoListId }: TaskTitleProps) => {
  const dispatch = useAppDispatch()

  const changeToDoListTitle = (newTitle: string) => {
    dispatch(changeToDoListTitleAC({ toDoListId: toDoListId, title: newTitle }))
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
