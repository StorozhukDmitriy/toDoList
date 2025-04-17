import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { FilterType } from "@/features/todolists/model/todolists-reducer.ts"
import { ToDoListTitle } from "@/features/todolists/ui/Todolists/Todolist/TodolistTitle/ToDoListTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Tasks.tsx"
import { createTaskAC } from "@/features/todolists/model/tasks-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { ButtonSection } from "@/features/todolists/ui/Todolists/Todolist/ButtonSection/ButtonSection.tsx"

type ToDoListPropsType = {
  toDoListId: string
  title: string
  filter: FilterType
}

export const ToDoList = ({ title, filter, toDoListId }: ToDoListPropsType) => {
  const dispatch = useAppDispatch()
  const AddTask = (newTitle: string) => {
    dispatch(createTaskAC({ todolistId: toDoListId, title: newTitle }))
  }
  return (
    <div>
      <ToDoListTitle title={title} toDoListId={toDoListId} />
      <AddItemForm createItem={AddTask} />
      <Tasks filter={filter} toDoListId={toDoListId} />
      <ButtonSection filter={filter} toDoListId={toDoListId} />
    </div>
  )
}
