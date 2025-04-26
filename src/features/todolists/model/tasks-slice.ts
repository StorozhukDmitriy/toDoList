import { createSlice, nanoid } from "@reduxjs/toolkit"
import { TaskType } from "@/features/todolists/ui/Todolists/Todolist/Tasks/Tasks.tsx"
import { AddTodolistAC, DeleteTodolistAC } from "@/features/todolists/model/todolists-slice.ts"

export type TaskStateType = Record<string, Array<TaskType>>

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const index = state[action.payload.todolistId].findIndex((el) => el.id === action.payload.taskId)
      state[action.payload.todolistId].splice(index, 1)
    }),
    createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      state[action.payload.todolistId].unshift({ id: nanoid(), title: action.payload.title, isDone: false })
    }),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const obj = state[todolistId].find((el) => el.id === taskId)
      if (obj) {
        obj.isDone = isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ taskId: string; todolistId: string; title: string }>((state, action) => {
      const { todolistId, taskId, title } = action.payload
      state[todolistId].find((el) => (el.id === taskId ? (el.title = title) : el))
    }),
  }),
  //extraReducers - функция возвращающая объект, используется если при изменениях в одном редьюсере, должны произойти попутно изменения в другом и при работе с санками.
  // иначе говоря, если диспатчим action из одного слайса, но так же необходимо осуществить изменения в другом.
  // Поскольку у нас createSlice формирует название из name + AC, получается что при вызове AddTodolistAC, case из taskReducer не будет вызван, так как у него будет имя tasks/AddTodolistAC, а не todolists/AddTodolistAC.
  extraReducers: (builder) => {
    builder
      .addCase(AddTodolistAC, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(DeleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
