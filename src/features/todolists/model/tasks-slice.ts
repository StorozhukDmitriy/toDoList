import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { DomainTask, tasksApi, TaskStatus, UpdateTaskModel } from "@/features/todolists/api"

import { RootState } from "@/app/store.ts"
import { changeStatusModeAC } from "@/app/app-slice.ts"
import { ResultCode } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

export type TaskStateType = Record<string, Array<DomainTask>>

//catch в конструкции try|catch отвечает за ошибки с кодом ошибки, все остальные ошибки обрабатываем в if/else.

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: (create) => ({
    //Принимает в себя payloadCreator( thunk ) и объект
    getTasks: create.asyncThunk(
      async (args: { todolistid: string }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          const res = await tasksApi.getTasks(args.todolistid)
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return { data: res.data.items, args: args }
        } catch (error) {
          dispatch(changeStatusModeAC({ status: "failed" }))
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state[action.payload.args.todolistid] = action.payload.data
          }
        },
      },
    ),

    deleteTaskTC: create.asyncThunk(
      async (args: { taskId: string; todolistId: string }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          await tasksApi.deleteTask(args.todolistId, args.taskId)
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return args
        } catch (error) {
          dispatch(changeStatusModeAC({ status: "failed" }))
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            const index = state[action.payload.todolistId].findIndex((el) => el.id === action.payload?.taskId)
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (args: { todolistId: string; title: string }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          const res = await tasksApi.createTask(args.todolistId, args.title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusModeAC({ status: "succeeded" }))
            return { item: res.data.data.item, todolistid: args.todolistId }
          }
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        } catch (error: any) {
          debugger
          handleServerNetworkError(dispatch, error)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            state[action.payload.todolistid].unshift(action.payload.item)
          }
        },
      },
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          const state = thunkAPI.getState() as RootState
          dispatch(changeStatusModeAC({ status: "loading" }))
          const task = state.tasks[args.todolistId].find((el) => el.id === args.taskId) as DomainTask
          const model: UpdateTaskModel = {
            description: task.description,
            status: args.status,
            deadline: task.deadline,
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
          }
          const res = await tasksApi.updateTaks({
            todolistId: args.todolistId,
            taskId: args.taskId,
            model: model,
          })
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return res.data.data.item
        } catch (error) {
          dispatch(changeStatusModeAC({ status: "failed" }))
          return rejectWithValue(error)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          const obj = state[action.payload.todoListId].find((el) => el.id === action.payload.id)
          if (obj) {
            obj.status = action.payload.status
          }
        },
      },
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (args: { taskId: string; todolistId: string; title: string }, thunkAPI) => {
        const { rejectWithValue, getState, dispatch } = thunkAPI
        const state = getState() as RootState // Получаем весь стейт
        const task = state.tasks[args.todolistId].find((el) => el.id === args.taskId) as DomainTask
        const model = {
          description: task.description,
          status: task.status,
          deadline: task.deadline,
          title: args.title,
          startDate: task.startDate,
          priority: task.priority,
        }
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          const res = await tasksApi.updateTaks({ todolistId: args.todolistId, taskId: args.taskId, model: model })
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return res.data.data.item
        } catch (error) {
          dispatch(changeStatusModeAC({ status: "failed" }))
          return rejectWithValue(error)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          const { todoListId: todolistId, id: taskId, title } = action.payload
          state[todolistId].find((el) => (el.id === taskId ? (el.title = title) : el))
        },
      },
    ),
  }),

  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload?.id] = []
        }
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(action.payload)
          delete state[action.payload.id]
        }
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer

export const { deleteTaskTC, createTaskTC, getTasks, changeTaskStatusTC, changeTaskTitleTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
