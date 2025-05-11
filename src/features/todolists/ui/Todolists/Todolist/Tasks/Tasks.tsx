import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { Task } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Task/Task.tsx"
import { FilterType } from "@/features/todolists/model/todolists-slice.ts"
import { getTasks, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks"
import { DomainTask, TaskStatus } from "@/features/todolists/api/tasksApi.types.ts"
import { RequestStatus } from "@/common/types"

type TasksListProps = {
  filter: FilterType
  toDoListId: string
  entityStatus: RequestStatus
}

export const Tasks = ({ filter, toDoListId, entityStatus }: TasksListProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    //Тут когда диспатчим запрос тасок, обязательно вызов !!!!!!
    dispatch(getTasks({ todolistid: toDoListId }))
  }, [])

  const tasks = useAppSelector(selectTasks)

  let filteredTask = tasks[toDoListId] as Array<DomainTask>
  if (filter === "Active") {
    filteredTask = tasks[toDoListId]?.filter((task: DomainTask) => task.status === TaskStatus.New)
  }
  if (filter === "Completed") {
    filteredTask = tasks[toDoListId]?.filter((task: DomainTask) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {filteredTask?.length === 0 ? (
        <span style={{ margin: "20px 0", display: "block", fontWeight: "bold" }}>Ваш список пуст</span>
      ) : (
        <List>
          {filteredTask?.map((el) => {
            return (
              <Task
                entityStatus={entityStatus}
                key={el.id}
                id={el.id}
                toDoListId={toDoListId}
                status={el.status}
                title={el.title}
              />
            )
          })}
        </List>
      )}
    </>
  )
}
