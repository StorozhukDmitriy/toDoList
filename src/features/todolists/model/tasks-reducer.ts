import { AddTodolistAC, DeleteTodolistAC } from "./todolists-reducer.ts"

import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { TaskType } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Tasks.tsx"

export type TaskStateType = {
  [toDoListId: string]: Array<TaskType>
}

const initialState: TaskStateType = {}
// type AddTaskAT = ReturnType<typeof AddTaskAC>

// Создаём Actions при помощи метода createAction, в дженериках передаём объект payload.
export const deleteTaskAC = createAction<{ taskId: string; todolistId: string }>("tasks/DELETE-TASK")
export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/CREATE-TASK")
export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
  "tasks/CHANGE_TASK-STATUS",
)
export const changeTaskTitleAC = createAction<{ taskId: string; todolistId: string; title: string }>(
  "tasks/CHANGE_TASK-TITLE",
)

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(DeleteTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
    .addCase(AddTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex((el) => el.id === action.payload.taskId)
      state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const obj = state[todolistId].find((el) => el.id === taskId)
      if (obj) {
        obj.isDone = isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { todolistId, taskId, title } = action.payload
      state[todolistId].find((el) => (el.id === taskId ? (el.title = title) : el))
    })
})
