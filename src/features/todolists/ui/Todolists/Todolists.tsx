import { ToDoList } from "@/features/todolists/ui/Todolists/Todolist/ToDoList.tsx"
import { Grid2, Paper } from "@mui/material"
import { useAppSelector } from "@/common/hooks"
import { selectToDoLists } from "@/features/todolists/model"

export const ToDolists = () => {
  const toDolists = useAppSelector(selectToDoLists)
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
