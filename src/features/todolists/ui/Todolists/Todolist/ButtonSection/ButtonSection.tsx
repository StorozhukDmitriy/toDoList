import { Button, ButtonGroup } from "@mui/material"
import { changeFilterAC, FilterType } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type ButtonSectionProps = {
  filter: FilterType
  toDoListId: string
}

export const ButtonSection = ({ filter, toDoListId }: ButtonSectionProps) => {
  const dispatch = useAppDispatch()
  const changeFilter = (filter: FilterType, toDoListId: string) => {
    dispatch(changeFilterAC({ filter: filter, id: toDoListId }))
  }

  return (
    <ButtonGroup variant={"contained"}>
      <Button
        disableElevation
        size={"small"}
        variant={"contained"}
        color={filter === "All" ? "primary" : "inherit"}
        onClick={() => changeFilter("All", toDoListId)}
      >
        All
      </Button>
      <Button
        disableElevation
        size={"small"}
        variant={"contained"}
        color={filter === "Active" ? "primary" : "inherit"}
        onClick={() => changeFilter("Active", toDoListId)}
      >
        Active
      </Button>
      <Button
        disableElevation
        size={"small"}
        variant={"contained"}
        color={filter === "Completed" ? "primary" : "inherit"}
        onClick={() => changeFilter("Completed", toDoListId)}
      >
        Completed
      </Button>
    </ButtonGroup>
  )
}
