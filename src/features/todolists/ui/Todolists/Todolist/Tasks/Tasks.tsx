import { List } from "@mui/material"

import { FilterType } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTasks } from "@/features/todolists/model/tasks-selector.ts"

import { Task } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.tsx"

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TasksListProps = {
  filter: FilterType
  toDoListId: string
}

export const Tasks = ({ filter, toDoListId }: TasksListProps) => {
  const tasks = useAppSelector(selectTasks)

  let filteredTask = tasks[toDoListId] as Array<TaskType>
  if (filter === "Active") {
    filteredTask = tasks[toDoListId].filter((task: TaskType) => !task.isDone)
  }
  if (filter === "Completed") {
    filteredTask = tasks[toDoListId].filter((task: TaskType) => task.isDone)
  }

  return (
    <>
      {filteredTask.length === 0 ? (
        <span style={{ margin: "20px 0", display: "block", fontWeight: "bold" }}>Ваш список пуст</span>
      ) : (
        <List>
          {filteredTask.map((el) => {
            return <Task key={el.id} id={el.id} toDoListId={toDoListId} isDone={el.isDone} title={el.title} />
          })}
        </List>
      )}
    </>
  )
}
