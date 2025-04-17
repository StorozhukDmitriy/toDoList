import { Container, Grid2 } from "@mui/material"
import { AddItemForm } from "@/common/components/AddItemForm/AddItemForm.tsx"
import { AddTodolistAC } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { ToDolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addToDoList = (newTitle: string) => {
    dispatch(AddTodolistAC(newTitle))
  }
  return (
    <Container maxWidth="lg">
      {/*<grid2></grid2> c атрибутом container формирует ряды*/}
      {/*в библиотеке material ui для точечной стилизации компонента используется атрибут sx*/}
      <Grid2 sx={{ padding: "25px 0" }} container>
        <AddItemForm createItem={addToDoList} />
      </Grid2>
      {/*spacing регулирует расстояние между ячейками внутри grid container*/}
      <Grid2 container spacing={5}>
        <ToDolists />
      </Grid2>
    </Container>
  )
}
