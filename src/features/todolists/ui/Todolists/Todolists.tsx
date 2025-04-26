import { ToDoList } from "@/features/todolists/ui/Todolists/Todolist/ToDoList.tsx"
import { Grid2, Paper } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectToDoLists, setTodolistsTC } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"

export const ToDolists = () => {
  // 5 todolistSlice обработал наше изменение в стейте и поскольку мы подписаны на изменение стейта через useAppSelector, компонента перерисовывается.
  const toDolists = useAppSelector(selectToDoLists)
  const dispatch = useAppDispatch()

  //Вызываем санку, непосредственно из компоненты, компонента не должна ничего делать, кроме возврата jsx и отрисовки ui.
  //1 инициируем запрос данных, обращаемся к BLL как оно и должно быть.
  // Ниже происходит так сказать асинхронный диспатч,эти действием мы диспатчим в санку вызывая функцию санку! Ориентир в конце суффикс TC.
  useEffect(() => {
    dispatch(setTodolistsTC())
  }, [])

  return (
    <>
      {toDolists.map((el) => {
        return (
          <Grid2 key={el.id}>
            {/*elevation регулирует тень */}
            <Paper elevation={4} sx={{ padding: "15px" }}>
              <ToDoList toDoListId={el.id} title={el.title} filter={el.filter} />
            </Paper>
          </Grid2>
        )
      })}
    </>
  )
}
