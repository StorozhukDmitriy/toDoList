import { ToDoList } from "@/features/todolists/ui/Todolists/Todolist/ToDoList.tsx"
import { Grid2, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectToDoLists, getTodolistsTC } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"

export const ToDolists = () => {
  // 5 todolistSlice обработал наше изменение в стейте и поскольку мы подписаны на изменение стейта через useAppSelector, компонента перерисовывается.
  const toDolists = useAppSelector(selectToDoLists)
  const dispatch = useAppDispatch()

  //Тут когда диспатчим запрос тудулистов, обязательно вызов !!!!!!
  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [])

  return (
    <>
      {toDolists.map((el) => {
        return (
          <Grid2 key={el.id}>
            {/*elevation регулирует тень */}
            <Paper elevation={4} sx={{ padding: "15px" }}>
              <ToDoList toDoListId={el.id} title={el.title} entityStatus={el.entityStatus} filter={el.filter} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
