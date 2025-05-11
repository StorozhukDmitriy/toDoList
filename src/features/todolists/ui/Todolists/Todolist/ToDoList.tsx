import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"

import { ToDoListTitle } from "@/features/todolists/ui/Todolists/Todolist/TodolistTitle/ToDoListTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Tasks.tsx"

import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { ButtonSection } from "@/features/todolists/ui/Todolists/Todolist/ButtonSection/ButtonSection.tsx"
import { FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { RequestStatus } from "@/common/types"

type ToDoListPropsType = {
  entityStatus: RequestStatus
  toDoListId: string
  title: string
  filter: FilterType
}

export const ToDoList = ({ title, filter, toDoListId, entityStatus }: ToDoListPropsType) => {
  const dispatch = useAppDispatch()
  const AddTask = (newTitle: string) => {
    dispatch(createTaskTC({ todolistId: toDoListId, title: newTitle }))
  }
  return (
    <div>
      <ToDoListTitle entityStatus={entityStatus} title={title} toDoListId={toDoListId} />
      <AddItemForm disable={entityStatus === "loading"} createItem={AddTask} />
      <Tasks entityStatus={entityStatus} filter={filter} toDoListId={toDoListId} />
      <ButtonSection filter={filter} toDoListId={toDoListId} />
    </div>
  )
}
