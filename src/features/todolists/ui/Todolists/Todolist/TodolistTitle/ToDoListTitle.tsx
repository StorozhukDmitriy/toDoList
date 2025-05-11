import { EditSpan } from "@/common/components/EditSpan/EditSpan.tsx"
import { IconButton } from "@mui/material"
import { DeleteForever } from "@mui/icons-material"

import { changeToDoListTitleTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"
import { RequestStatus } from "@/common/types"

type TaskTitleProps = {
  title: string
  toDoListId: string
  entityStatus: RequestStatus
}

export const ToDoListTitle = ({ title, toDoListId, entityStatus }: TaskTitleProps) => {
  const dispatch = useAppDispatch()

  const changeToDoListTitle = (newTitle: string) => {
    dispatch(changeToDoListTitleTC({ id: toDoListId, title: newTitle }))
  }

  const deleteToDoList = (toDoListId: string) => {
    dispatch(deleteTodolistTC({ id: toDoListId }))
  }

  return (
    <h3>
      <EditSpan title={title} disable={entityStatus === "loading"} onBlur={changeToDoListTitle} />
      <IconButton disabled={entityStatus === "loading"} size={"small"} onClick={() => deleteToDoList(toDoListId)}>
        {" "}
        <DeleteForever color={"primary"} />
      </IconButton>
    </h3>
  )
}
